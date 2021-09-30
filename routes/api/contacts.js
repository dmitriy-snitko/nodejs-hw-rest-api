const express = require('express')
const router = express.Router()

const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')

const { ctrlWrap, validation } = require('../../middlewares')
const ctrl = require('../../controllers')

router.get('/', ctrlWrap(ctrl.listContacts))

router.get('/:contactId', ctrlWrap(ctrl.getContactById))

router.post('/', validation(joiSchema), ctrlWrap(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), ctrlWrap(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(updateFavoriteJoiSchema), ctrlWrap(ctrl.updateContact))

router.delete('/:contactId', ctrlWrap(ctrl.removeContact))

module.exports = router
