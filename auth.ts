import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@/lib/generated/prisma";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

//TODO:Find more cleaner way to fix this type
export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER";
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
//TODO:----------------------------------------

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            //Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            //TODO:solve this undefined
            const existingUser = await getUserById(user.id || "");

            //prevent signin without verification
            if (!existingUser?.emailVerified) return false;

            //TODO: add 2FA check
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id);

                console.log({twoFactorConfirmation})

                if (!twoFactorConfirmation) {
                    return false;
                }

                //delete two factor confirmation for next signin
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id,
                    },
                });
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole; //not clean way to fix this
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        },
    },
    //@ts-ignore
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
