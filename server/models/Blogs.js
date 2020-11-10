const { Schema, model } = require('mongoose')
const { CustomDate } = require('../utils')
const initValues = required => ({
	type: String,
	trim: true,
	required: required && false,
})

const groupSchema = new Schema({
	title: initValues(true),
	thumbnail: initValues(),
})

exports.Blogs = new model('Blogs', groupSchema)

let date = new Date()
let time = date.toLocaleTimeString()
const schema = new Schema({
	title: initValues(true),
	content: initValues(true),
	thumbnail: initValues(),
	groupThumbnail: initValues(),
	keywords: initValues(),
	readTime: initValues(true),
	lang: initValues(true),
	createdAt: {
		type: String,
		default: new Date().toUTCString(),
		// default: Date.now(),
	},
	// {
	// 	date: {
	// 		type: String,
	// 		default: date.toLocaleDateString(),
	// 	},

	// 	time: {
	// 		type: String,
	// 		default: time.slice(0, time.length - 3),
	// 	},
	// },
	group: {
		type: Schema.Types.ObjectId,
		ref: 'BlogsGroup',
	},
})

exports.Post = new model('Post', schema)

// createdAt: {
// 	type: String,
// 	default: new Date().toLocaleDateString(),
// },
