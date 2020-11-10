const fs = require('fs')
const readTime = require('reading-time')
const nodemailer = require('nodemailer')
const { Blogs, Post } = require('../../models/Blogs')
const { Subscriber } = require('../../models/Model')

// Require validator
const validator = require('../../utils/validator')
const { removeFilePathFromFs } = require('../../utils')

exports.getPublicDataGetController = async (req, res, next) => {
	try {
		const blogs = await Blogs.find()
		const posts = await Post.find()
		res.status(200).json({ blogs, posts })
	} catch (e) {
		next(e)
	}
}

// Get all blogs group
exports.getBlogsGroupGetController = async (req, res, next) => {
	try {
		res.status(200).json({ blogs: await Blogs.find() })
	} catch (e) {
		next(e)
	}
}

exports.createBlogsPostController = async (req, res, next) => {
	try {
		const { title } = req.body
		const file = req.file
		const errors = {
			...validator(title, null, null, 'title'),
		}
		if (Object.keys(errors).length !== 0) {
			removeFilePathFromFs(null, req)
			return res.status(422).json({ message: 'Invalid Creadentials', errors })
		}
		const hasGroup = await Blogs.findOne({ title })
		if (hasGroup) {
			removeFilePathFromFs(null, req)
			return res.status(409).json({ message: `This group already created by the name of ${hasGroup.title}` })
		}
		const createGroup = new Blogs({ title, thumbnail: file ? `/uploads/${file.filename}` : '' })
		const createdGroup = await createGroup.save()
		if (!createdGroup) {
			removeFilePathFromFs(null, req)
			return res.status(500).json({ message: 'Internal server error' })
		}
		console.log(createdGroup)
		res.status(201).json({ message: 'Successfully created blogs group', blogsGroup: createdGroup })
	} catch (e) {
		next(e)
	}
}
// Update portfolio group controller
exports.updateBlogsPutController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title } = req.body
		const file = req.file
		const errors = {
			...validator(title, null, null, 'title'),
		}
		if (Object.keys(errors).length !== 0) {
			removeFilePathFromFs(null, req)
			return res.status(422).json({ message: 'Invalid Creadentials', errors })
		}
		const hasGroup = await Blogs.findOne({ _id: id })
		if (!hasGroup) {
			removeFilePathFromFs(null, req)
			return res.status(404).json({ message: 'Post group is not available' })
		}
		const hasTitle = await Blogs.findOne({ title })
		if (hasTitle) {
			if (hasGroup._id.toString() !== hasTitle._id.toString()) {
				removeFilePathFromFs(null, req)
				return res.status(409).json({ message: `This group already created by the name of ${hasTitle.title}` })
			}
		}
		const updatedGpTitle = await Blogs.findOneAndUpdate(
			{ _id: id },
			{
				title,
				thumbnail: file ? `/uploads/${file.filename}` : hasGroup.thumbnail,
			},
			{ new: true }
		)
		if (!updatedGpTitle) {
			removeFilePathFromFs(null, req)
			return res.status(500).json({ message: 'Internal server error' })
		}
		if (file) {
			removeFilePathFromFs(`public${hasGroup.thumbnail}`)
		}
		console.log(file)
		res.status(200).json({ message: 'Successfully updated title', group: updatedGpTitle })
	} catch (e) {
		next(e)
	}
}
// Delete portfolio group controller
exports.deleteBlogsDeleteController = async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedGroup = await Blogs.findOneAndDelete({ _id: id })
		if (!deletedGroup) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		const blogItems = await Post.find({ group: id })
		blogItems.forEach(async item => {
			const deletedItem = await Post.findOneAndDelete({ _id: item._id })
			if (!deletedItem) {
				return res.status(500).json({ message: 'Internal server error' })
			}
		})

		removeFilePathFromFs(`public/${deletedGroup.thumbnail}`)
		res.status(200).json({ message: 'Successfully deleted group and blogs post', group: deletedGroup })
	} catch (e) {
		next(e)
	}
}

// Create blogs post
exports.getAllBlogsPostsGetController = async (req, res, next) => {
	try {
		res.status(200).json({ posts: await Post.find() })
	} catch (e) {
		next(e)
	}
}
exports.createPostPostController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title, content, keywords, lang } = req.body
		const file = req.file
		const hasBlogs = await Blogs.findOne({ _id: id })
		if (!hasBlogs) {
			if (file) {
				fs.unlink(file.path, error => {
					if (error) {
						return res.status(422).json({ message: 'Somthing went to wrong!' })
					}
				})
			}
			return res.status(404).json({ message: 'Invalid group id or not founded group' })
		}

		const errors = {
			...validator(title, null, null, 'title'),
			...validator(content, null, null, 'content'),
			...validator(lang, null, null, 'lang'),
		}
		if (Object.keys(errors).length !== 0) {
			if (file) {
				fs.unlink(file.path, error => {
					if (error) {
						return res.status(422).json({ message: 'Somthing went to wrong!', errors })
					}
				})
			}
			return res.status(422).json({ message: 'Invalid creadentials', errors })
		}
		const uniquePostTitle = await Post.findOne({ title })
		if (uniquePostTitle) {
			if (file) {
				fs.unlink(file.path, error => {
					if (error) {
						return res.status(422).json({ message: 'Somthing went to wrong!Try agian' })
					}
				})
			}
			return res.status(409).json({ message: 'Please provied unique title' })
		}

		const createPost = new Post({
			title,
			content,
			keywords,
			group: hasBlogs._id,
			thumbnail: file ? `/uploads/${file.filename}` : '',
			groupThumbnail: hasBlogs.thumbnail || '',
			readTime: readTime(content).text,
			lang,
		})
		const createdPost = await createPost.save()
		if (!createdPost) {
			if (file) {
				fs.unlink(file.path, error => {
					if (error) {
						return res.status(422).json({ message: 'Somthing went to wrong!' })
					}
				})
			}
			return res.status(500).json({ message: 'Internal server error' })
		}
		// Sent Mail To Notify Every subscribers
		const transporter = await nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		})

		const subscribers = await Subscriber.find()

		// let postTitile = createdPost.title.toLowerCase().replaceAll(' ', '-')
		subscribers.forEach(async sub => {
			try {
				const info = await transporter.sendMail({
					from: process.env.EMAIL,
					to: sub.email,
					subject: createdPost.title,
					html: `
					<h4>Assalamu Alaikum!</h4>
					<h5>News!<h5>
					<p>Me uploaded new blog post for see the post visi now!</p>
					<a href="http://mdminhaj.com/blog/${createdPost.title}">${createdPost.title}</a>
		
					<br/>
					Thanks You
					`,
				})
				if (!info.response) {
					return res.status(500).json({ message: 'Failed to send mail' })
				}
			} catch (e) {
				return next(e)
			}
		})
		res.status(201).json({ message: 'Successfully creared post', post: createdPost })
	} catch (e) {
		next(e)
	}
}

// Update blogs post
exports.updatePostPutController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title, content, keywords, lang, group } = req.body
		const file = req.file
		const errors = {
			...validator(title, null, null, 'title'),
			...validator(content, null, null, 'content'),
			...validator(lang, null, null, 'lang'),
		}
		const hasBlogs = await Blogs.findOne({ _id: group })
		if (Object.keys(errors).length !== 0) {
			if (file) {
				fs.unlink(file.path, error => {
					if (error) {
						return res.status(422).json({ message: 'Somthing went to wrong!', errors })
					}
				})
			}
			return res.status(422).json({ message: 'Invalid creadentials', errors })
		}
		const uniquePost = await Post.findOne({ title })
		if (uniquePost) {
			if (uniquePost._id.toString() !== id.toString()) {
				if (file) {
					fs.unlink(file.path, error => {
						if (error) {
							return res.status(422).json({ message: 'Somthing went to wrong!,Try again' })
						}
					})
				}
				return res.status(409).json({ message: 'Please provied unique title' })
			}
		}

		const hasPost = await Post.findOne({ _id: id })

		const updatedPost = await Post.findOneAndUpdate(
			{ _id: id },
			{
				title: title ? title : hasPost.title,
				content: content ? content : hasPost.content,
				thumbnail: file ? `/uploads/${file.filename}` : hasPost.thumbnail,
				groupThumbnail: hasBlogs ? hasBlogs.thumbnail : hasPost.groupThumbnail,
				keywords: keywords ? keywords : hasPost.keywords,
				readTime: content ? readTime(content).text : hasPost.readTime,
				lang: lang ? lang : hasPost.lang,
				group: group ? group : hasPost.group,
			},
			{ new: true }
		)

		if (!updatedPost) {
			if (file) {
				fs.unlink(file.path, error => {
					if (error) {
						return res.status(422).json({ message: 'Somthing went to wrong!again' })
					}
				})
			}
			return res.status(500).json({ message: 'Internal server error' })
		}
		if (file) {
			if (hasPost.thumbnail) {
				fs.unlink(`public${hasPost.thumbnail}`, error => {
					if (error) {
						return res.status(422).json({ message: 'Somthing went to wrong!', errors })
					}
				})
			}
		}
		res.status(200).json({ message: 'Successfully updated post', post: updatedPost })
	} catch (e) {
		next(e)
	}
}

// Delete blogs post
exports.deletePostDeleteController = async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedPost = await Post.findOneAndDelete({ _id: id })
		if (!deletedPost) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		if (deletedPost.thumbnail) {
			fs.unlink(`public${deletedPost.thumbnail}`, error => {
				if (error) {
					return res.status(422).json({ message: 'Somthing went to wrong!' })
				}
			})
		}
		res.status(200).json({ message: 'Successfully deleted post', post: deletedPost })
	} catch (e) {
		next(e)
	}
}

exports.subscriberDataGetController = async (req, res, next) => {
	try {
		const subscribers = await Subscriber.find()

		res.status(200).json({ subscribers })
	} catch (e) {
		next(e)
	}
}

exports.subscribePostPostController = async (req, res, next) => {
	try {
		const { email } = req.body

		let error = null
		if (!email) {
			error = 'Please provied your email'
		} else if (!email.includes('@')) {
			error = 'Invalid email address'
		}
		if (error) {
			return res.status(422).json({
				message: error,
			})
		}

		const isSubscribed = await Subscriber.findOne({ email })
		if (isSubscribed) {
			return res.status(200).json({ message: "You're already subscribed the blog" })
		}
		const subscribe = new Subscriber({ email })

		const subscribed = await subscribe.save()
		if (!subscribed) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(201).json({ message: 'Thanks for subscribe the blog' })
	} catch (e) {
		next(e)
	}
}
exports.deleteSubscriberDeleteController = async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedSubscriber = await Subscriber.findOneAndDelete({ _id: id })
		if (!deletedSubscriber) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(200).json({ message: 'Successfully delete email', subscriber: deletedSubscriber })
	} catch (e) {
		next(e)
	}
}

exports.updateSubscriberPutController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { email } = req.body
		if (!email) {
			return res.status(422).json({ message: 'Please provied email' })
		}
		const updatedSubscriber = await Subscriber.findOneAndUpdate({ _id: id }, { email }, { new: true })
		if (!updatedSubscriber) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		console.log(updatedSubscriber)
		res.status(200).json({ message: 'Successfully updated email', subscriber: updatedSubscriber })
	} catch (e) {
		next(e)
	}
}

// Next works routing and client ui
exports.mailSenderPostController = async (req, res, next) => {
	try {
		const { subject, message } = req.body
		const transporter = await nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		})

		const subscribers = await Subscriber.find()

		subscribers.forEach(async sub => {
			try {
				const info = await transporter.sendMail({
					from: process.env.EMAIL,
					to: sub.email,
					subject,
					text: message,
				})
				if (!info.response) {
					return res.status(500).json({ message: 'Failed to send mail' })
				}
			} catch (e) {
				return next(e)
			}
		})

		res.status(200).json({
			message: 'Successfully sended mail to everyone',
		})
	} catch (e) {
		next(e)
	}
}
