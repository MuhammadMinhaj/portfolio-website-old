const { Schema, model } = require('mongoose')

const initValues = required => ({
	type: String,
	trim: true,
	required: required && false,
})

const groupSchema = new Schema({
	title: initValues(true),
})

exports.Blogs = new model('Blogs', groupSchema)

const schema = new Schema({
	title: initValues(true),
	content: initValues(true),
	thumbnail: initValues(),
	keywords: initValues(),
	group: {
		type: Schema.Types.ObjectId,
		ref: 'BlogsGroup',
	},
})

exports.Post = new model('Post', schema)
