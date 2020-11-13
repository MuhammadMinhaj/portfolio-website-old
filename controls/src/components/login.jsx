import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Container,
	Card,
	CardContent,
	CardActions,
	FormControl,
	TextField,
	Button,
	IconButton,
	Typography,
	Snackbar,
	LinearProgress,
} from '@material-ui/core'

import { LockOpen as LockOpenIcon, Close as CloseIcon } from '@material-ui/icons'

import { loginHandleChange, loginHandleSubmit, handleClearMessage } from '../redux/actions/app'

export default () => {
	const {
		loginInfo: { email, password },
		loginErrors,
		isLoading,
		msg,
	} = useSelector(state => state.app)

	const dispatch = useDispatch()

	return (
		<Container>
			<Snackbar
				message={msg}
				open={msg ? true : false}
				autoHideDuration={8000}
				onClose={() => dispatch(handleClearMessage())}
				action={
					<IconButton color="secondary" onClick={() => dispatch(handleClearMessage())}>
						<CloseIcon />
					</IconButton>
				}
			/>

			<Typography variant="h3" align="center">
				Login To Dashboard
			</Typography>

			<br />
			<form onSubmit={e => dispatch(loginHandleSubmit(e))}>
				<Card raised style={{ maxWidth: '600px', margin: 'auto' }}>
					{isLoading && <LinearProgress />}

					<br />
					<Typography align="center" variant="h4">
						LOGIN
					</Typography>
					<CardContent>
						<FormControl margin="dense" fullWidth>
							<TextField
								onChange={e => dispatch(loginHandleChange(e))}
								value={email}
								type="email"
								name="email"
								variant="filled"
								label="Email"
								error={loginErrors.email ? true : false}
								helperText={loginErrors.email}
							/>
						</FormControl>
						<br />
						<br />
						<FormControl margin="dense" fullWidth>
							<TextField
								onChange={e => dispatch(loginHandleChange(e))}
								value={password}
								type="password"
								name="password"
								variant="filled"
								label="Password"
								error={loginErrors.password ? true : false}
								helperText={loginErrors.password}
							/>
						</FormControl>
					</CardContent>

					<CardActions>
						<Button type="submit" startIcon={<LockOpenIcon />} variant="contained" color="primary" fullWidth>
							Login
						</Button>
					</CardActions>
				</Card>
			</form>
		</Container>
	)
}
