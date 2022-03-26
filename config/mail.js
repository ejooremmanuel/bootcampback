const nodemailer = require("nodemailer");

const sendEmail = async function (options) {
  const transporter = nodemailer.createTransport({
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },

    service: "Gmail",
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME}, <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email,
    cc: options.cc,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  transporter.sendMail(message, (err, info) => {
    if (!err) {
      console.log("message sent " + info.response);
    }
  });
};

module.exports = sendEmail;
