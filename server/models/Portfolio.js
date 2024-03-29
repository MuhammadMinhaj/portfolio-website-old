const { Schema, model } = require('mongoose')
const { CustomDate } = require('../utils')
const initValues = required => ({
	type: String,
	trim: true,
	required: required && false,
})

const groupSchema = new Schema({
	title: initValues(true),
})
exports.PortfolioGroup = new model('PortfolioGroup', groupSchema)

const schema = new Schema({
	title: initValues(true),
	description: initValues(),
	thumbnail: initValues(true),
	tools: initValues(true),
	link: initValues(),
	client: initValues(),
	industry: initValues(),
	time: initValues(),
	createdAt: {
		type: String,
		default: new Date().toLocaleDateString(),
	},
	images: [
		{
			title: initValues(true),
			path: initValues(true),
		},
	],
	group: {
		type: Schema.Types.ObjectId,
		ref: 'PortfolioGroup',
	},
})
exports.Portfolio = new model('Portfolio', schema)
