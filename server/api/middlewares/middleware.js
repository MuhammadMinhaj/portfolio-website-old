const express = require('express')
const morgan = require('morgan')
const middlewares = [express.urlencoded({ extended: true }), express.json()]

if (process.env.NODE_ENV === 'development') {
	middlewares.push(morgan('dev'))
}

module.exports = app => {
	middlewares.forEach(middleware => {
		app.use(middleware)
	})
}
