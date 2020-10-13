const { Schema, model } = require('mongoose')

const initValues = required => ({
	type: String,
	trim: true,
	required: required && false,
})

const schema = new Schema({
	name: initValues(true),
	username: initValues(true),
	email: initValues(true),
	password: initValues(true),
	image: String,
	isAdmin: {
		type: Boolean,
		default: false,
	},
})

module.exports = new model('User', schema)
