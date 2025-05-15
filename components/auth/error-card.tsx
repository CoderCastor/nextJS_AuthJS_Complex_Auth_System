import { CardWrapper } from "@/components/auth/card-wrapper";
import { TriangleAlert } from "lucide-react";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
            showSocial={false}
        >
            <div className="w-full flex justify-center items-center">
                <TriangleAlert className="text-destructive" />
            </div>
        </CardWrapper>
    );
};
