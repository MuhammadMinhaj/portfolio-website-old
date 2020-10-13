import { HANDLE_DRAWER_TOGGLE } from '../constants'

export const handleDrawerToggle = () => {
	return dispatch => {
		dispatch({
			type: HANDLE_DRAWER_TOGGLE,
		})
	}
}
