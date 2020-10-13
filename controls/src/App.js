import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/store'
import Routes from './routes'
import { CssBaseline } from '@material-ui/core'
import Appbar from './common/appbar'
import Sidebar from './common/sidebar'
import useStyle from './common/style'

const App = () => {
	const classes = useStyle()

	return (
		<Provider store={store}>
			<Router>
				<div className={classes.root}>
					<CssBaseline />
					{/* App Bar Of Top */}
					<Appbar />
					{/* Sidebar Of Left Side*/}
					<Sidebar />
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Routes />
					</main>
				</div>
			</Router>
		</Provider>
	)
}

export default App
