const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { sendSeccessRes, createEmail, sendEmail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.setAvatar(email)

  const verifyToken = await newUser.setVerifyToken()

  await newUser.save()

  const data = createEmail(req, verifyToken)
  sendEmail(data)

  sendSeccessRes(
    res,
    {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
    201,
    'Success register',
  )
}

module.exports = register
