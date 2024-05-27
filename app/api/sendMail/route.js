// In a file like sendEmail.js
import nodemailer from "nodemailer";


export const POST = async (request) => {


   console.log("Post HIT")

  const { selectedRows } = await request.json();

  console.log(selectedRows);

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
  
      service: "Gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: "nikhilkajota9413750125@gmail.com",
      subject: "Test Email",
      text: "This is a test email sent from Nodemailer in Next.js!",
    });

    console.log("Email sent:", info);

    // Respond with success message
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    // Respond with error message
    res.status(500).json({ error: "Failed to send email" });
  }
};
