import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import store from './redux/store/store'
import Routes from './routes'
import Header from './common/header'
import Footer from './common/footer'

const App = () => {
	const [scrollPos, setScrollPos] = useState()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')

	const handleScroll = () => {
		let correntScrollPosition = window.pageYOffset

		const navbar = document.getElementById('navContainer')

		if (scrollPos > correntScrollPosition) {
			navbar.style.top = '0px'
		} else {
			navbar.style.top = isMatchedWidth ? '-154px' : '-97px'
		}
		setScrollPos(correntScrollPosition)
	}
	window.addEventListener('scroll', handleScroll)
	return (
		<>
			<Provider store={store}>
				<Router>
					<Header />
					<Routes />
					<Footer />
				</Router>
			</Provider>
		</>
	)
}

export default App
