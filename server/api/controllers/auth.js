const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../../models/Users')

// Require validator
const validator = require('../../utils/validator')
// User Token Verify Controller
exports.verifytokenGetController = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token')
		if (!token) {
			return res.json(false)
		}
		jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
			if (error) {
				return res.json(false)
			}
			if (decoded) {
				return res.status(200).json(true)
			}
		})
	} catch (e) {
		next(e)
	}
}
// User Registration Controller
exports.registerUserPostController = async (req, res, next) => {
	try {
		const { name, username, email, password, image, isAdmin } = req.body
		const hasEmail = await User.findOne({ email })
		if (hasEmail) {
			return res.status(409).json({ message: 'This email already existed on database' })
		}
		const hasUsername = await User.findOne({ username })
		if (hasUsername) {
			return res.status(409).json({ message: 'Username must be unique' })
		}
		let errors = {
			...validator(name, null, null, 'name'),
			...validator(username, 5, 30, 'username'),
			...validator(email, null, null, 'email'),
			...validator(password, 6, null, 'password'),
		}
		if (Object.keys(errors).length !== 0) {
			return res.status(422).json({ message: 'Invalid Creadentials', errors })
		}
		const hashedPassowrd = await bcrypt.hash(password, 11)
		const user = new User({
			name,
			username,
			email,
			password: hashedPassowrd,
			image,
			isAdmin,
		})
		const createdUser = await user.save()
		if (!createdUser) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(200).json({ message: 'Successfully Created User', user: createdUser })
	} catch (e) {
		next(e)
	}
}
// User Login Controller
exports.loginPostController = async (req, res, next) => {
	try {
		const { email, password } = req.body

		let errors = {
			...validator(email, null, null, 'email'),
			...validator(password, 6, null, 'password'),
		}
		if (Object.keys(errors).length !== 0) {
			return res.status(422).json({ message: 'Invalid Creadentials', errors })
		}
		const hasEmail = await User.findOne({ email })
		if (!hasEmail) {
			return res.status(401).json({ message: 'Unregistered email address' })
		}
		const isValidPassword = await bcrypt.compare(password, hasEmail.password)
		if (!isValidPassword) {
			return res.status(403).json({ message: 'Invalid password' })
		}
		const token = jwt.sign({ token: hasEmail._id, email, username: hasEmail.username }, process.env.TOKEN_SECRET, { expiresIn: '12h' })
		res.status(200).json({ message: 'Successfully Loggedin', token })
	} catch (e) {
		next(e)
	}
}
