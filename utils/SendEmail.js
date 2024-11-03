import nodemailer from "nodemailer";

const SendEmail = async ({ to, subject, html }) => {
  try {
    // Use your Ethereal account or create a new one
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "7f2f7b001@smtp-brevo.com",
        pass: "pz3Tw5xh2Q0gW4cn",
      },
    });

    // Define the mail options
    const mailOptions = {
      from: '"Aquib Ahmad" <aquib445488@gmail.com>',
      to,
      subject,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log the message ID or URL for viewing the sent email
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    // Handle any errors that occur during email sending
    console.error("Error sending email:", error);
    throw error; // Propagate the error for further handling
  }
};

export default SendEmail;
