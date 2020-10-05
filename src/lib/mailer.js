const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9b6e22a6dfc178",
      pass: "6a13ac97f6ab71"
    }
  });