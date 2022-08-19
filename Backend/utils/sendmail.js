const nodemailer = require('nodemailer')

const sendmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  })

  const mailoptions = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(mailoptions)
}

module.exports = sendmail
