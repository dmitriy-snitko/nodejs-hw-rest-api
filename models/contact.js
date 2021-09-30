const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean()
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact
}
