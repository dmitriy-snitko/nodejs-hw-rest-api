const { NotFound } = require('http-errors')

const { Contact } = require('../../models')
const { sendSeccessRes } = require('../../helpers')

const updateContact = async (req, res) => {
  const { contactId } = req.params
  const ownerId = req.user._id

  const contact = await Contact.findById(contactId)

  if (!contact || ownerId.toString() !== contact.owner.toString()) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  sendSeccessRes(res, result, 200, 'Contact has been successfully updated')
}

module.exports = updateContact
