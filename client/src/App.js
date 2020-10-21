import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProgressBar } from 'scrolling-based-progressbar'

import store from './redux/store/store'
import Routes from './routes'
import Header from './common/header'
import Footer from './common/footer'

const App = () => {
	return (
		<>
			<Provider store={store}>
				<Router>
					<div>
						<ProgressBar height="4px" color="#f50057" bgColor="#607d8b42" />
					</div>
					<Header />
					<Routes />
					<Footer />
				</Router>
			</Provider>
		</>
	)
}

export default App
