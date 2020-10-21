const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { PortfolioGroup, Portfolio } = require('../../models/Portfolio')

// Require validator
const validator = require('../../utils/validator')

exports.getPublicDataGetController = async (req, res, next) => {
	try {
		const groups = await PortfolioGroup.find()
		const projects = await Portfolio.find()
		res.status(200).json({ groups, projects })
	} catch (e) {
		next(e)
	}
}

// Get All Portfolio Group
exports.getAllPostfolioGroupGetController = async (req, res, next) => {
	try {
		res.status(200).json({ group: await PortfolioGroup.find() })
	} catch (e) {
		next(e)
	}
}

// Create portfolio group controller
exports.createPortfolioGroupPostController = async (req, res, next) => {
	try {
		const { title } = req.body
		const errors = {
			...validator(title, null, null, 'title'),
		}
		if (Object.keys(errors).length !== 0) {
			return res.status(422).json({ message: 'Invalid Creadentials', errors })
		}
		const hasGroup = await PortfolioGroup.findOne({ title })
		if (hasGroup) {
			return res.status(409).json({ message: `This group already created by the name of ${hasGroup.title}` })
		}
		const createPortfolioGp = new PortfolioGroup({
			title,
		})
		const createdPortfolioGp = await createPortfolioGp.save()
		if (!createdPortfolioGp) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(201).json({ message: 'Successfully created portfolio group', group: createdPortfolioGp })
	} catch (e) {
		next(e)
	}
}
// Update portfolio group controller
exports.updatePortfolioGroupPutController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title } = req.body

		if (!title) {
			return res.status(422).json({ message: 'Invalid Creadentials' })
		}
		const hasGroup = await PortfolioGroup.findOne({ _id: id })
		if (!hasGroup) {
			return res.status(404).json({ message: 'Portfolio group is not available' })
		}
		const hasTitle = await PortfolioGroup.findOne({ title })
		if (hasTitle) {
			if (hasGroup._id.toString() !== hasTitle._id.toString()) {
				return res.status(409).json({ message: `This group already created by the name of ${hasTitle.title}` })
			}
		}
		const updatedGpTitle = await PortfolioGroup.findOneAndUpdate(
			{ _id: id },
			{
				title,
			},
			{ new: true }
		)
		if (!updatedGpTitle) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(200).json({ message: 'Successfully updated title', group: updatedGpTitle })
	} catch (e) {
		next(e)
	}
}

const removeFileFromHost = path => {
	fs.unlink(path, error => {
		if (error) {
			return error
		}
	})
	return true
}
function removeFiles(files) {
	if (files) {
		if (files.thumbnail) {
			removeFileFromHost(files.thumbnail[0].path)
		}
		if (files.images) {
			files.images.forEach(img => {
				removeFileFromHost(img.path)
			})
		}
	}
}

// Delete portfolio group controller
exports.deletePortfolioGroupDeleteController = async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedGroup = await PortfolioGroup.findOneAndDelete({ _id: id })
		if (!deletedGroup) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		const portfolioItems = await Portfolio.find({ group: id })

		portfolioItems.forEach(async item => {
			const deletedItem = await Portfolio.findOneAndDelete({ _id: item._id })
			if (!deletedItem) {
				return res.status(500).json({ message: 'Internal server error' })
			} else {
				deletedItem.thumbnail && removeFileFromHost(`public${deletedItem.thumbnail}`)
				if (deletedItem.images.length !== 0) {
					deletedItem.images.forEach(img => {
						removeFileFromHost(`public${img.path}`)
					})
				}
			}
		})
		res.status(200).json({ message: 'Successfully deleted group and portfolio items', group: deletedGroup })
	} catch (e) {
		next(e)
	}
}

exports.getAllPostfolioProjectGetController = async (req, res, next) => {
	try {
		res.status(200).json({ projects: await Portfolio.find() })
	} catch (e) {
		next(e)
	}
}

// Create Portfolio
exports.createPortfolioItemPostController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title, description, tools, titles, link, client, industry, time } = req.body
		const hasGroup = await PortfolioGroup.findOne({ _id: id })

		if (!hasGroup) {
			removeFiles(req.files)
			return res.status(404).json({ message: 'Group is not available' })
		}
		let errors = {
			...validator(title, null, 200, 'title'),
			...validator(tools, null, null, 'tools'),
			...validator(time, null, null, 'time'),
		}
		if (!req.files) {
			errors.files = 'Not found any files with request'
		}
		if (!req.files.thumbnail) {
			errors.thumbnail = 'Please provied thumbnail'
		}
		if (!req.files.images) {
			errors.images = 'Please provied images'
		}
		if (!titles) {
			errors.titles = 'You have to must be provied image titles'
		}
		if (Object.keys(errors).length !== 0) {
			removeFiles(req.files)
			return res.status(422).json({ message: 'Invalid creadentials', errors })
		}

		let images = []

		req.files.images.forEach((img, i) => {
			titles.split(',').forEach((t, j) => {
				if (i === j) {
					images.push({
						path: `/uploads/${img.filename}`,
						title: t,
					})
				}
			})
		})

		const createPortfolioItem = new Portfolio({
			title,
			description,
			thumbnail: `/uploads/${req.files.thumbnail[0].filename}`,
			tools,
			images,
			link,
			client,
			industry,
			time,
			group: hasGroup._id,
		})
		const createdPortfolioItem = await createPortfolioItem.save()

		if (!createdPortfolioItem) {
			removeFiles(req.files)
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(200).json({ message: 'Successfully created portfolio project', project: createdPortfolioItem })
	} catch (e) {
		next(e)
	}
}
// Update portfolio item controller
exports.updatePortfolioItemPutController = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title, description, tools, titles, link, oldImages, imgDeleteId, group, client, industry, time } = req.body

		let errors = {
			...validator(title, null, 200, 'title'),
			...validator(tools, null, null, 'tools'),
			...validator(time, null, null, 'time'),
		}
		if (Object.keys(errors).length !== 0) {
			removeFiles(req.files)
			return res.status(422).json({ message: 'Invalid creadentials', errors })
		}
		const hasProject = await Portfolio.findOne({ _id: id })
		if (!hasProject) {
			removeFiles(req.files)
			return res.status(404).json({ message: "Project isn't existed" })
		}

		const prevThumbnailPath = hasProject.thumbnail
		const prevImages = hasProject.images
		hasProject.title = title
		hasProject.description = description
		hasProject.tools = tools
		hasProject.link = link
		hasProject.client = client
		hasProject.industry = industry
		hasProject.time = time
		hasProject.group = mongoose.Types.ObjectId(group)
		hasProject.thumbnail = req.files
			? req.files.thumbnail
				? `/uploads/${req.files.thumbnail[0].filename}`
				: hasProject.thumbnail
			: hasProject.thumbnail

		const newImages = []

		// Add Updated Image Titles
		hasProject.images.forEach(img => {
			JSON.parse(oldImages).forEach(oldImg => {
				if (img._id.toString() === oldImg._id.toString()) {
					img.title = oldImg.title
					newImages.push(img)
				}
			})
		})

		// Add New Images
		if (req.files) {
			if (req.files.images) {
				req.files.images.forEach((img, i) => {
					titles.split(',').forEach((t, j) => {
						if (i === j) {
							newImages.push({
								path: `/uploads/${img.filename}`,
								title: t,
							})
						}
					})
				})
			}
		}
		hasProject.images = newImages

		// Added New Updatation Values
		const updatedPortfolioProject = await Portfolio.findOneAndUpdate({ _id: id }, hasProject, { new: true })
		if (!updatedPortfolioProject) {
			removeFiles(req.files)
			return res.status(500).json({ message: 'Internal Server Error' })
		}

		let willDeletedImages = []
		imgDeleteId.split(',').forEach(deletedId => {
			prevImages.forEach(img => {
				if (deletedId.toString() === img._id.toString()) {
					willDeletedImages.push(img)
				}
			})
		})

		let deletedImages = null

		let updatedProjects = new Promise((resolve, rejects) => {
			if (willDeletedImages.length === 0) {
				resolve(updatedPortfolioProject)
			} else {
				willDeletedImages.forEach(async (img, ind) => {
					deletedImages = await Portfolio.findOneAndUpdate(
						{ _id: id },
						{
							$pull: {
								images: { _id: img._id },
							},
						},
						{ new: true }
					)
					if (deletedImages) {
						removeFileFromHost(`public/${img.path}`)
					}
					if (ind === willDeletedImages.length - 1) {
						if (deletedImages) {
							resolve(deletedImages)
						} else {
							rejects(new Error('Internal Server Error'))
						}
					}
				})
			}
		})

		updatedProjects
			.then(project => {
				if (req.files.thumbnail) {
					removeFileFromHost(`public/${prevThumbnailPath}`)
				}
				res.status(200).json({ message: 'Successfully updated project', project })
			})
			.catch(err => {
				res.status(500).json({ message: 'Internal Server Error' })
			})
	} catch (e) {
		next(e)
	}
}
// Delete Portfolio item controller
exports.deletePortfolioItemDeleteController = async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedProject = await Portfolio.findOneAndDelete({ _id: id })
		if (!deletedProject) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		if (deletedProject.thumbnail) {
			removeFileFromHost(`public${deletedProject.thumbnail}`)
		}
		if (deletedProject.images.length !== 0) {
			deletedProject.images.forEach(file => {
				removeFileFromHost(`public${file.path}`)
			})
		}
		res.status(200).json({ message: 'Successfully deleted project', project: deletedProject })
	} catch (e) {
		next(e)
	}
}
