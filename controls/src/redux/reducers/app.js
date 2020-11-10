import { HANDLE_DRAWER_TOGGLE } from '../constants'
const initialState = {
	isOpenDrawer: false,
	accessToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVmNzIxNWYxNmM4NjkxNWY5M2U3MTE4OCIsImVtYWlsIjoibWRtaW5oYWoyNEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1kbWluaGFqIiwiaWF0IjoxNjA0OTg4Nzc4LCJleHAiOjE2MDUwMzE5Nzh9.Gh9Pa0a_GZGFTlQPjGsbeKOE64vYm2rfs7gpzY14Mig',
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
