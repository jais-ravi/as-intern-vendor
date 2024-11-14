import transporter from "@/lib/nodemailer";
import { render } from "@react-email/render";
import VendorRegistrationEmail from "../../email/VendorRegistrationEmail";



export default async function registerVendorMailSend(email, firstName,) {
  const emailHTML = await render(
    <VendorRegistrationEmail firstName={firstName}/>
  );
  const mailOptions = {
    from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Registered as a vendor!",
    text: "Congratulations 🎉", 
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
