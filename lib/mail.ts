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

import nodemailer from 'nodemailer'
import {google} from 'googleapis'


const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export async function sendVerificationEmail(email :string ,token : string) {
  try {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    console.log("function gets called")
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        //@ts-ignore
      service: 'gmail',
      auth: {
        type: 'OAuth2',
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
  <h2 style="color: #4F46E5;">Welcome to Castor's Auth Service!</h2>
  <p>Hi there,</p>
  <p>Thank you for signing up. Please confirm your email address by clicking the button below:</p>

  <a href=${confirmLink} style="display: inline-block; background-color: #4F46E5; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirm Email</a>

  <p style="margin-top: 20px;">If the button doesn't work, you can copy and paste the following link into your browser:</p>

  <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; word-break: break-all; border: 1px solid #ddd;">
    ${confirmLink}
  </div>


  <p style="margin-top: 30px;">Thanks,<br>The Castor Team</p>
</div>
`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
