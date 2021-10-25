const { User } = require('../../models')
const { NotFound, BadRequest } = require('http-errors')
const { createEmail, sendEmail, sendSeccessRes } = require('../../helpers')

const resend = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound('Not Found')
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const data = createEmail(req, user.verifyToken)
  sendEmail(data)

  sendSeccessRes(res, null, 200, 'Verification email sent')
}

module.exports = resend
