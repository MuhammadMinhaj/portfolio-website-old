const { Schema, model } = require('mongoose')

const initValues = required => ({
	type: String,
	trim: true,
	required: required && false,
})

const schema = new Schema({
	name: initValues(true),
	email: initValues(true),
	subject: initValues(true),
	message: initValues(true),
})
module.exports = new model('Contact', schema)
