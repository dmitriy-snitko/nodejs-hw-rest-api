const { NotFound } = require('http-errors')

const { Contact } = require('../models')
const { sendSeccessRes } = require('../helpers')

const updateContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }

  sendSeccessRes(res, result, 200, 'Contact has been successfully updated')
}

module.exports = updateContact
