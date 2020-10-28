const fs = require('fs')

exports.removeFilePathFromFs = (path, req) => {
	let isDelete = true
	if (path) {
		fs.unlink(path, error => {
			if (error) {
				isDelete = false
			}
		})

		return isDelete
	}

	if (req.file) {
		fs.unlink(req.file.path, error => {
			if (error) {
				isDelete = false
			}
		})

		return isDelete
	}
}
exports.CustomDate = () => {
	let today = new Date()
	let dd = String(today.getDate()).padStart(2, '0')
	let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
	let yyyy = today.getFullYear()
	today = dd + '/' + mm + '/' + yyyy
	return today
}