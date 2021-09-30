const { Contact } = require('../models')
const { sendSeccessRes } = require('../helpers')

const listContacts = async (_, res) => {
  const result = await Contact.find({}, '_id name email phone favorite')
  sendSeccessRes(res, result)
}

module.exports = listContacts
