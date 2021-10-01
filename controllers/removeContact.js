const { NotFound } = require('http-errors')

const { Contact } = require('../models')
const { sendSeccessRes } = require('../helpers')

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }

  sendSeccessRes(res, result, 200, 'Contact has been successfully deleted')
}

module.exports = removeContact
