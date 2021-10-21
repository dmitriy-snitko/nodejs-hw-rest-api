const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { sendSeccessRes } = require('../../helpers')
const gravatar = require('gravatar')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  const avatar = gravatar.url(
    email,
    {
      s: '250',
      d: 'robohash',
    },
    true
  )

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.setAvatar(avatar)

  await newUser.save()

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
