const express = require('express')
const router = express.Router()

const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')

const { ctrlWrap, validation, authenticate } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', authenticate, ctrlWrap(ctrl.listContacts))

router.get('/:contactId', authenticate, ctrlWrap(ctrl.getContactById))

router.post('/', authenticate, validation(joiSchema), ctrlWrap(ctrl.addContact))

router.put('/:contactId', authenticate, validation(joiSchema), ctrlWrap(ctrl.updateContact))

router.patch('/:contactId/favorite', authenticate, validation(updateFavoriteJoiSchema), ctrlWrap(ctrl.updateContact))

router.delete('/:contactId', authenticate, ctrlWrap(ctrl.removeContact))

module.exports = router
