const currentUserInfo = async (req, res) => {
  const { email, subscription } = req.user

  res.json({
    email,
    subscription
  })
}

module.exports = currentUserInfo
