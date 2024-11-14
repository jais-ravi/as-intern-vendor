import transporter from "@/lib/nodemailer";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "../../email/ForgotPasswordEmail";


export default async function ForgotPasswordEmailSend(email, firstName, verifyCode) {
  const emailHTML = await render(
    <ForgotPasswordEmail firstName={firstName} otp={verifyCode} />
  );
  const mailOptions = {
    from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Email Verification Code",
    text: "Verification mail", 
    html: emailHTML,
  };
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
