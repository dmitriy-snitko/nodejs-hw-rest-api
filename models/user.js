const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const { v4 } = require('uuid')

const { SECRET_KEY } = process.env

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.setVerifyToken = function () {
  this.verifyToken = v4()
  return this.verifyToken
}

userSchema.methods.setAvatar = function (email) {
  const avatar = gravatar.url(
    email,
    {
      s: '250',
      d: 'robohash',
    },
    true
  )

  this.avatarURL = avatar
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  }

  return jwt.sign(payload, SECRET_KEY)
}

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const joiResendingSchema = Joi.object({
  email: Joi.string().required()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
  joiResendingSchema
}
