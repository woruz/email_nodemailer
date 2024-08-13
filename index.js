const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors")
require("dotenv").config();

const app = express();
port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json())

app.get("/",async(req,res) => {
    res.json({msg: "Hello World"})
})

app.post("/sendEmail", async (req, res) => {
  const { email, name } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptionsOne = {
    from: "sabil.danish1997@gmail.com",
    to: email,
    subject: "Thank You for Booking Your Consultation!",
    html:  `
    <p>Dear ${name},</p>
    <h1>Thank you for booking a consultation with us!</h1>
    <p>We’re excited to assist you on your publication journey.</p>
    <p>Our team of experts is dedicated to helping you achieve your research goals. Whether you’re looking for guidance on manuscript preparation, journal selection, or submission assistance, we’re here to provide the support you need.</p>
    <h2>What Happens Next:</h2>
    <ul>
      <li><strong>Consultation:</strong> One of our publication consultants will reach out to you within [24-48 hours] to schedule your consultation.</li>
      <li><strong>Personalized Support:</strong> During the consultation, we’ll discuss your specific needs and outline how we can best support your publication goals.</li>
    </ul>
    <p>In the meantime, feel free to explore our website <a href="https://www.manuscriptedit.com">www.manuscriptedit.com</a> for tips and insights on successful publishing.</p>
    <p>If you have any immediate questions, don’t hesitate to contact us at <a href="mailto:success@manuscriptedit.com">success@manuscriptedit.com</a>.</p>
    <p>We look forward to working with you!</p>
    <p>Best regards,</p>
    <p>Manuscriptedit Editorial (Operation)</p>
  `,
  };

  const mailOptionsTwo = {
    from: "sabil.danish1997@gmail.com",
    to: "support@manuscriptedit.com",
    subject: "Email Received",
    html:
      "<h1>Your Email is Received</h1><p>We have received your email: " +
      email +
      "</p>",
  };

  try {
    let info_client = await transporter.sendMail(mailOptionsOne);
    let info_admin = await transporter.sendMail(mailOptionsTwo);

    res.json({ message: "success" });
  } catch (error) {
    console.error("Error sending email: ", error);
    return res.json(
      { message: "Something went wrong" }
    );
  }
});

app.listen(port, console.log(`port running on port number ${port}`));
