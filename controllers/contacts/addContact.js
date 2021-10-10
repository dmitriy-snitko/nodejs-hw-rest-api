const { Contact } = require('../../models')
const { sendSeccessRes } = require('../../helpers')

const addContact = async (req, res) => {
  const result = await Contact.create({ ...req.body, owner: req.user._id })
  sendSeccessRes(res, result, 201, 'Contact has been successfully added')
}

module.exports = addContact
