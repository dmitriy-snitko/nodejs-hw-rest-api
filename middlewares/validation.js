const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      res.status(400).json({
        status: 'Error',
        code: 400,
        message: error.message
      })
    }
    next()
  }
}

module.exports = validation
