const express = require('express')

const router = express.Router()

const { validation, ctrlWrap, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const { auth: ctrl } = require('../../controllers/')

router.post('/signup', validation(joiSchema), ctrlWrap(ctrl.register))
router.post('/login', validation(joiSchema), ctrlWrap(ctrl.login))
router.get('/logout', authenticate, ctrlWrap(ctrl.logout))
router.get('/current', authenticate, ctrlWrap(ctrl.currentUserInfo))

module.exports = router
