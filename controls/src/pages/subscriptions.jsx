import React from 'react'
import Subscriptions from '../components/subscriptions'
import useStyle from '../common/style'

import { CssBaseline } from '@material-ui/core'
import Appbar from '../common/appbar'
import Sidebar from '../common/sidebar'

export default () => {
	const classes = useStyle()
	return (
		<div className={classes.root}>
			<CssBaseline />
			{/* App Bar Of Top */}
			<Appbar />
			{/* Sidebar Of Left Side*/}
			<Sidebar />
			<main className={classes.content}>
				<Subscriptions />
			</main>
		</div>
	)
}
