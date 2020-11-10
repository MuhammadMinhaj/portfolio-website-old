const { Schema, model } = require('mongoose')

const initValues = required => ({
	type: String,
	trim: true,
	required: required && false,
})

const contactSchema = new Schema({
	name: initValues(true),
	email: initValues(true),
	subject: initValues(true),
	message: initValues(true),
	createdAt: {
		type: String,
		default: new Date().toLocaleDateString(),
	},
})
exports.Contact = new model('Contact', contactSchema)

const subscriberSchema = new Schema({
	email: initValues(true),
})

exports.Subscriber = new model('Subscriber', subscriberSchema)
