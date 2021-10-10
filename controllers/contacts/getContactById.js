const { NotFound } = require('http-errors')

const { Contact } = require('../../models')
const { sendSeccessRes } = require('../../helpers')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const ownerId = req.user._id

  const result = await Contact.findById(contactId)

  if (!result || ownerId.toString() !== result.owner.toString()) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }

  sendSeccessRes(res, result)
}

module.exports = getContactById
