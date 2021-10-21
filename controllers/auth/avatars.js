const { User } = require('../../models')
const { sendSeccessRes } = require('../../helpers')
const fs = require('fs/promises')

const Jimp = require('jimp')

const path = require('path')

const uploadDir = path.join(__dirname, '../../', 'public')

const avatars = async (req, res) => {
  const userId = req.user._id

  const { originalname, path: tempPath } = req.file
  const [extention] = originalname.split('.').reverse()

  const fileName = `${userId}.${extention}`
  const filePath = path.join(uploadDir, 'avatars', fileName)

  const originalImage = await Jimp.read(tempPath)
  const resizedImage = originalImage.cover(250, 250)

  resizedImage.write(tempPath)

  try {
    await fs.rename(tempPath, filePath)
    const avatar = path.join('avatars', fileName)

    const { avatarURL } = await User.findByIdAndUpdate(
      userId,
      { avatarURL: avatar },
      { new: true }
    )

    sendSeccessRes(res, { avatarURL })
  } catch (error) {
    fs.unlink(tempPath)
  }
}

module.exports = avatars
