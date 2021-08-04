/**
 * Application : Portfolio Web and Admin Application
 * Author : Muhammad Minhaj Islam
 * **/

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const setMiddlewares = require('./server/api/middlewares/middleware')
const setRoutes = require('./server/api/routes/routes')

// Static Forlder Of Client Directory
app.use(express.static(path.join(__dirname, 'client', 'build')))
// Import For Set Middlewares
setMiddlewares(app)

// Import For Set Routes
setRoutes(app)
// Application Root Route
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

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
