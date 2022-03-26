const sendEmail = require("../config/mail");
const User = require("../models/User");
const { renderTemplate } = require("../utils/templates");
const path = require("path");
const { createMailChimp } = require("../utils/mailChimp");

module.exports.CreateUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const emailTemplate = path.join(req.app.get("views"), "sendEmail.ejs");

    const html = renderTemplate(emailTemplate, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      selection: user.selection,
    });

    const options = {
      email: process.env.RECEIVER,
      cc: process.env.CC,
      subject: "New User For BootCamp",
      message: "",
      html,
    };

    const [mailRes, mailChimpRes] = await Promise.all([
      sendEmail(options),
      createMailChimp(user.email, user.name),
    ]);

    console.log(mailRes, mailChimpRes);

    return res.status(201).json({ success: true });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
};
