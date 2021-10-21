const register = require('./registr')
const login = require('./login')
const logout = require('./logout')
const currentUserInfo = require('./currentUserInfo')
const avatars = require('./avatars')

module.exports = {
  register,
  login,
  logout,
  currentUserInfo,
  avatars
}
