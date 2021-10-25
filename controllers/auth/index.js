const register = require('./registr')
const verify = require('./verify')
const login = require('./login')
const logout = require('./logout')
const currentUserInfo = require('./currentUserInfo')
const avatars = require('./avatars')
const resend = require('./resend')

module.exports = {
  register,
  verify,
  login,
  logout,
  currentUserInfo,
  avatars,
  resend
}
