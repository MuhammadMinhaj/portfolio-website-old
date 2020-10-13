const jwt = require('jsonwebtoken')
const User = require('../../models/Users')

exports.isValidApiKey = () => {
	return (req, res, next) => {
		const key = req.header('x-api-key')
		if (!key) {
			return res.status(400).json({ message: 'Missing api key --Access denied' })
		}
		if (key !== process.env.API_KEY) {
			return res.status(400).json({ message: 'Invalid api key --Access denied' })
		}
		next()
	}
}

exports.isAuthenticated = () => {
	return (req, res, next) => {
		const token = req.header('x-auth-token')
		if (!token) {
			return res.status(400).json({ message: 'Missing authentication token --Access denied' })
		}
		jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
			try {
				if (error) {
					return res.status(401).json({ message: 'Invalid authentication token --Access denied' })
				}
				if (decoded) {
					const hasUser = await User.findOne({ _id: decoded.token })
					if (!hasUser) {
						return res.status(401).json({ message: 'Invalid Creadentials --Access denied' })
					}
				}
				next()
			} catch (e) {
				next(e)
			}
		})
	}
}
