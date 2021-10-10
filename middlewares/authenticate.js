const jwt = require('jsonwebtoken')

const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      throw new Error('Not authorized')
    }

    const [bearer, token] = authorization.split(' ')

    if (bearer !== 'Bearer') {
      throw new Error('Not authorized')
    }

    const { _id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(_id)

    if (!user || user.token !== token) {
      throw new Error('Not authorized')
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      status: 'Error',
      code: 401,
      message: error.message,
    })
  }
}

module.exports = authenticate
