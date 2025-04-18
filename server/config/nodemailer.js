import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMPT_USER_NAME,
      pass: process.env.SMPT_USER_PASSWORD,
    },
  });



export default transporter