import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import store from './redux/store'
import Routes from './routes'

import useStyle from './common/style'

const App = () => {
	const classes = useStyle()
	const location = useLocation()

	return (
		<>
			{location.pathname !== '/login' && <div className={classes.toolbar} />} <Routes />
		</>
	)
}

export default () => {
	return (
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	)
}
