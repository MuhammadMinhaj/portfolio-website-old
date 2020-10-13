module.exports = (value, min, max, name) => {
	let errors = {}
	if (!value) {
		errors[name] = `Please provied ${name}`
		return errors
	}
	if (typeof min === 'number') {
		if (value.length < min) {
			errors[name] = `${name} must be greater then ${min}`
		}
	}
	if (typeof max === 'number') {
		if (value.length > max) {
			errors[name] = `${name} must be within the ${max}`
		}
	}
	if (name.toLowerCase() === 'email') {
		if (!value.includes('@')) {
			errors[name] = 'Please provied valid email'
		}
	}
	return errors
}
