const { User } = require('../../models')
const { NotFound, Conflict } = require('http-errors')
const sendSeccessRes = require('../../helpers/sendSeccessRes')

const verify = async (req, res) => {
  const { verificationToken } = req.params

  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw new NotFound('User not found')
  }

  if (user.verify) {
    throw new Conflict('Email already verify')
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null })

  sendSeccessRes(res, null, 200, 'Verification successful')
}

module.exports = verify
