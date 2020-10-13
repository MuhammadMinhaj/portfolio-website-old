require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const setMiddlewares = require('./api/middlewares/middleware')
const setRoutes = require('./api/routes/routes')


// Import For Set Middlewares
setMiddlewares(app)

// Import For Set Routes
setRoutes(app)

mongoose
	.connect(process.env.MONGO_DB_URI, {
		useUnifiedTopology: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('DATABASE CONNECTION ESTABLISHED')
		const PORT = process.env.PORT || 8080
		app.listen(PORT, () => {
			console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
		})
	})
	.catch(error => {
		console.log('DATABASE CONNECTION FAILED!', error)
	})
