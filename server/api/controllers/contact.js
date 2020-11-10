const nodemailer = require('nodemailer')
const { Contact } = require('../../models/Model')
const validator = require('../../utils/validator')

exports.contactGetDataGetController = async (req, res, next) => {
	try {
		res.status(200).json(await Contact.find())
	} catch (e) {
		next(e)
	}
}

exports.contactSendPostController = async (req, res, next) => {
	try {
		const { name, email, subject, message } = req.body

		let error = {
			...validator(name, null, null, 'name'),
			...validator(email, null, null, 'email'),
			...validator(subject, null, null, 'subject'),
			...validator(message, null, null, 'message'),
		}
		if (Object.keys(error).length !== 0) {
			return res.status(422).json({
				message: 'Invalid Creadentials',
				error,
			})
		}
		const contact = new Contact({
			name,
			email,
			subject,
			message,
		})
		const sendedContact = await contact.save()
		if (!sendedContact) {
			return res.status(500).json({
				message: 'Internal server error',
			})
		}
		res.status(201).json({
			message: 'Thanks for contact with me! I will send you mail as soon as possible',
		})
		console.log(sendedContact)
	} catch (e) {
		next(e)
	}
}

exports.contactDeleteDeleteController = async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedContact = await Contact.findOneAndDelete({ _id: id })
		if (!deletedContact) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(200).json({ message: 'Successfully deleted contact', mail: deletedContact })
	} catch (e) {
		next(e)
	}
}

exports.contactSendMailPostController = async (req, res, next) => {
	try {
		const { email } = req.params
		const { subject, message } = req.body

		if (!subject || !message) {
			return res.status(422).json({ message: 'You must have to provide subject and message' })
		}
		// Sent Mail To Notify Every subscribers
		const transporter = await nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		})

		const info = await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: subject,
			text: message,
		})
		if (!info.response) {
			return res.status(500).json({ message: 'Internal server error' })
		}
		res.status(200).json({ message: `Successfully sended mail to ~${email}` })
	} catch (e) {
		next(e)
	}
}
