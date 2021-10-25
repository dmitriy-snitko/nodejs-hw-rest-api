const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async(data) => {
  const email = {
    ...data,
    from: 'dmitriy@3g.ua'
  }

  await sgMail.send(email)
}

module.exports = sendEmail
