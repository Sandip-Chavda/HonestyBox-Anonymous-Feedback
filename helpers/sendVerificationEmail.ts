import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import VerificationEmail from "./emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS,
      },
    });

    const emailHtml = render(VerificationEmail({ username, otp: verifyCode }));

    const options = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "HonestyBox OTP Verification | HonestyBox🙋🏻",
      html: emailHtml,
    };

    await transporter.sendMail(options);

    return {
      success: true,
      message: "Verification email send successfully.",
    };
  } catch (emailError) {
    console.error("Error sending verification email --", emailError);

    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
