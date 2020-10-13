const fs = require('fs')
const { Blogs, Post } = require('../../models/Blogs')
// Require validator
const validator = require('../../utils/validator')

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
		console.log('Assalamu Alaikum')
		const { title } = req.body
		const errors = {
			...validator(title, null, null, 'title'),
		}
		if (Object.keys(errors).length !== 0) {
			return res.status(422).json({ message: 'Invalid Creadentials', errors })
		}
		const hasGroup = await Blogs.findOne({ title })
		if (hasGroup) {
			return res.status(409).json({ message: `This group already created by the name of ${hasGroup.title}` })
		}
		const createGroup = new Blogs({ title })
		const createdGroup = await createGroup.save()
		if (!createdGroup) {
			return res.status(500).json({ message: 'Internal server error' })
		}
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

		const errors = {
			...validator(title, null, null, 'title'),
		}
		if (Object.keys(errors).length !== 0) {
			return res.status(422).json({ message: 'Invalid Creadentials', errors })
		}
		const hasGroup = await Blogs.findOne({ _id: id })
		if (!hasGroup) {
			return res.status(404).json({ message: 'Post group is not available' })
		}
		const hasTitle = await Blogs.findOne({ title })
		if (hasTitle) {
			if (hasGroup._id.toString() !== hasTitle._id.toString()) {
				return res.status(409).json({ message: `This group already created by the name of ${hasTitle.title}` })
			}
		}
		const updatedGpTitle = await Blogs.findOneAndUpdate(
			{ _id: id },
			{
				title,
			},
			{ new: true }
		)
		if (!updatedGpTitle) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(200).json({ message: 'Successfully updated title', portfolioGroup: updatedGpTitle })
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
		res.status(200).json({ message: 'Successfully deleted group and blogs items', group: deletedGroup })
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
		const { title, content, keywords } = req.body
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
		res.status(201).json({ message: 'Successfully creared post', post: createdPost })
	} catch (e) {
		next(e)
	}
}

// Update blogs post
exports.updatePostPutController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title, content, keywords } = req.body
		const file = req.file
		const errors = {
			...validator(title, null, null, 'title'),
			...validator(content, null, null, 'content'),
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
				keywords: keywords ? keywords : hasPost.keywords,
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
