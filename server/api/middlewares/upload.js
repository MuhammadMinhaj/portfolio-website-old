const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
	},
})

module.exports = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: (req, file, cb) => {
		const types = /jpeg|jpg|png|gip/
		const extName = types.test(path.extname(file.originalname).toLowerCase())
		const mimType = types.test(file.mimetype)
		if (extName && mimType) {
			cb(null, true)
		} else {
			cb(new Error('File is not supported'))
		}
	},
})
