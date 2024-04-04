// In a file like sendEmail.js
import nodemailer from "nodemailer";


const { SMTP_EMAIL, SMTP_PASSWORD , SMTP_EMAIL_to } = process.env;


export const POST = async (request) => {


   console.log("Post HIT")

  const  selectedRows  = await request.json();

  console.log(selectedRows);


  const textContent = selectedRows.map(row => {
    // Extract data from each row object
    const { _id, name, phone_number, email, hobbies } = row;
  
    // Format the row information
    return `
      ID: ${_id}
      Name: ${name}
      Phone Number: ${phone_number}
      Email: ${email}
      Hobbies: ${hobbies.join(', ')}
    `;
  }).join('\n\n');


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
      to: SMTP_EMAIL_to,
      subject: "Data of selected rows",
      text: textContent,
    });

    console.log("Email sent:", info);

    // Respond with success message
    return new Response("email sent", { status: 200 })
    
  } catch (error) {
    console.error("Error sending email:", error);
    // Respond with error message
    return new Response("Failed to send email", { status: 500 })
  }
};
