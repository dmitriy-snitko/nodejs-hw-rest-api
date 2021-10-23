const { User } = require('../../models')
const { NotFound } = require('http-errors')

const { sendSeccessRes } = require('../../helpers')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.comparePassword(password)) {
    throw new NotFound('Email or password incorrect')
  }

  if (!user.verify) {
    throw new NotFound('Email not verify')
  }

  const token = user.createToken()

  await User.findByIdAndUpdate(user._id, { token })

  sendSeccessRes(
    res,
    {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      }
    }
  )
}

module.exports = login
