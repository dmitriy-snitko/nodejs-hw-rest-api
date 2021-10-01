const { NotFound } = require('http-errors')

const { Contact } = require('../models')
const { sendSeccessRes } = require('../helpers')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, '_id name email phone favorite')

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }

  sendSeccessRes(res, result)
}

module.exports = getContactById
