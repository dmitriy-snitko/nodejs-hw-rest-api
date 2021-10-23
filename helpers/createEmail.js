const createEmail = (req, verifyToken) => {
  const { email } = req.body
  const { baseUrl } = req
  const { host } = req.headers

  const data = {
    to: email,
    subject: 'Confirm verification',
    html: `
      <a href ='http://${host}${baseUrl}/verify/${verifyToken}'>
        Подтверждение верификации
      </a>
    `
  }

  return data
}

module.exports = createEmail
