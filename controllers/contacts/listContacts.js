const { Contact } = require('../../models')
const { sendSeccessRes } = require('../../helpers')

const listContacts = async (req, res) => {
  const { _id } = req.user

  const result = await Contact.find({ owner: _id }, '_id name email phone favorite')
  sendSeccessRes(res, result)
}

module.exports = listContacts
