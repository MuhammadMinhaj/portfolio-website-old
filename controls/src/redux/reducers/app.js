import { HANDLE_DRAWER_TOGGLE } from '../constants'
const initialState = {
	isOpenDrawer: false,
	accessToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVmNzIxNWYxNmM4NjkxNWY5M2U3MTE4OCIsImVtYWlsIjoibWRtaW5oYWoyNEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1kbWluaGFqIiwiaWF0IjoxNjAyNTY2NjM3LCJleHAiOjE2MDI2MDk4Mzd9.jZ576G6lceej-pPgLjX4Sk_BSdDUAoN65YKJuSD8U_A',
}

export default (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_DRAWER_TOGGLE:
			state = {
				...state,
				isOpenDrawer: !state.isOpenDrawer,
			}
			return state
		default:
			return state
	}
}
