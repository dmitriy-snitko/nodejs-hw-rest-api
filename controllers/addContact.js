const { Contact } = require('../models')
const { sendSeccessRes } = require('../helpers')

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSeccessRes(res, result, 201, 'Contact has been successfully added')
}

module.exports = addContact
