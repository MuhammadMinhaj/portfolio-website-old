const { Schema, model } = require('mongoose')

const initValues = required => ({
	type: String,
	trim: true,
	required: required && false,
})

const groupSchema = new Schema({
	title: initValues(true),
})
exports.PortfolioGroup = new model('PortfolioGroup', groupSchema)

const CustomDate = () => {
	let today = new Date()
	let dd = String(today.getDate()).padStart(2, '0')
	let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
	let yyyy = today.getFullYear()
	today = dd + '/' + mm + '/' + yyyy
	return today
}

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
		default: CustomDate(),
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
