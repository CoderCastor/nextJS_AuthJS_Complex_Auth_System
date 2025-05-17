// import { Resend } from "resend";

//TODO: use for production

/*
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}>here</a> to confirm email.</p>`
    })
    
};
*/

import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

export async function sendVerificationEmail(email: string, token: string) {
    try {
        const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
        console.log("function gets called");
        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            //@ts-ignore
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: `Team AuthService`,
            to: email,
            subject: "Confirm your email",
            html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  <h1 style="font-size: 1.5rem; font-weight: 600; margin-top: 0.75rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
  ⇲ Exam<span style="color: #6B21A8;">iniX</span>
</h1>
  <p>Hi there,</p>
  <p>Thank you for signing up. Please confirm your email address by clicking the button below:</p>

  <a href=${confirmLink} style="display: inline-block; background-color: #4F46E5; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirm Email</a>

  <p style="margin-top: 20px;">If the button doesn't work, you can copy and paste the following link into your browser:</p>

  <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; word-break: break-all; border: 1px solid #ddd;">
    ${confirmLink}
  </div>


  <p style="margin-top: 30px;">Thanks,<br>⇲ Examinix Team</p>
</div>
`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export async function sendPasswordResetEmail(email: string, token: string) {
    try {
        const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            //@ts-ignore
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: `Team AuthService`,
            to: email,
            subject: "Reset your password",
            html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 30px; max-width: 600px; margin: auto; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 6px 18px rgba(0,0,0,0.05);">
<h1 style="font-size: 1.5rem; font-weight: 600; margin-top: 0.75rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
  ⇲ Exam<span style="color: #6366F1;">iniX</span>
</h1>
  <div style="text-align: center;">
    <h2 style="color: #4F46E5; margin: 0 0 10px;">Reset Your Password</h2>
    <p style="color: #6b7280; font-size: 15px; margin-bottom: 30px;">
      You requested to reset your password. Click the button below to proceed.
    </p>
    <a href="${resetLink}" style="background: linear-gradient(90deg, #6366F1, #8B5CF6); color: white; padding: 14px 24px; text-decoration: none; font-weight: 600; border-radius: 6px; display: inline-block; margin-bottom: 24px;">
      Reset Password
    </a>
    <p style="font-size: 13px; color: #6b7280;">If the button doesn't work, copy and paste the link below:</p>
    <div style="background-color: #f3f4f6; padding: 10px 14px; border-radius: 5px; word-break: break-word; border: 1px solid #d1d5db; font-size: 13px; color: #374151;">
      ${resetLink}
    </div>
    <p style="font-size: 13px; color: #6b7280; margin-top: 30px;">If you did not request this, please ignore this email.</p>
    <p style="font-size: 14px; color: #4B5563; margin-top: 40px;">— ⇲ Examinix Team</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0 10px;">
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">© ⇲ Examinix Inc. All rights reserved.</p>
  </div>
</div>
`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    try {
        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            //@ts-ignore
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: `Team AuthService`,
            to: email,
            subject: "2FA Code",
            html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 30px; max-width: 600px; margin: auto; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 6px 18px rgba(0,0,0,0.05);">
  <div style="text-align: center;">
    <h1 style="font-size: 1.5rem; font-weight: 600; margin-top: 0.75rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
  ⇲ Exam<span style="color: #6366F1;">iniX</span>
</h1>
    <h2 style="color: #4F46E5; margin: 0 0 10px;">Your Two Factor Authentication Code</h2>
    <p style="color: #6b7280; font-size: 15px; margin-bottom: 24px;">
      Use the code below to complete your sign-in. This code will expire in 10 minutes.
    </p>

    <div style="display: inline-block; font-size: 32px; letter-spacing: 10px; font-weight: bold; background-color: #eef2ff; color: #4338ca; padding: 14px 24px; border-radius: 10px; border: 1px dashed #c7d2fe; margin-bottom: 30px;">
      ${token}
    </div>

    <p style="font-size: 13px; color: #6b7280; margin-bottom: 10px;">If you didn’t request this code, you can safely ignore this email.</p>
    <p style="font-size: 14px; color: #4B5563; margin-top: 30px;">— ⇲ Examinix Team</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0 10px;">
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">© ⇲ Examinix Inc. All rights reserved.</p>
  </div>
</div>
`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
