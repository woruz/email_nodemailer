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
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "sabil.danish1997@gmail.com",
    to: email,
    subject: "Email Received",
    html:
      "<h1>Your Email is Received</h1><p>We have received your email: " +
      email +
      "</p>",
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    res.json({ message: "success" });
  } catch (error) {
    console.error("Error sending email: ", error);
    return res.json(
      { message: "Something went wrong" }
    );
  }
});

app.listen(port, console.log(`port running on port number ${port}`));
