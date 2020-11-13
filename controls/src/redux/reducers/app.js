import {
	LOGIN_HANDLE_LOADER,
	CLEAR_MESSAGE,
	HANDLE_DRAWER_TOGGLE,
	LOGIN_HANDLE_CHANGE,
	LOGIN_ERRORS_OCCURRED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
} from '../constants'
const initValues = {
	email: '',
	password: '',
}
const initialState = {
	isOpenDrawer: false,
	isLoading: false,
	msg: '',
	accessToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVmNzIxNWYxNmM4NjkxNWY5M2U3MTE4OCIsImVtYWlsIjoibWRtaW5oYWoyNEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1kbWluaGFqIiwiaWF0IjoxNjA0OTg4Nzc4LCJleHAiOjE2MDUwMzE5Nzh9.Gh9Pa0a_GZGFTlQPjGsbeKOE64vYm2rfs7gpzY14Mig',
	loginInfo: initValues,
	loginErrors: initValues,
	isLoggedIn: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_HANDLE_LOADER:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case CLEAR_MESSAGE:
			state = {
				...state,
				msg: '',
			}
			return state
		case HANDLE_DRAWER_TOGGLE:
			state = {
				...state,
				isOpenDrawer: !state.isOpenDrawer,
			}
			return state
		case LOGIN_HANDLE_CHANGE:
			state = {
				...state,
				loginInfo: {
					...state.loginInfo,
					[action.payload.target.name]: action.payload.target.value,
				},
				loginErrors: {
					...state.loginErrors,
					[action.payload.target.name]: '',
				},
			}
			return state
		case LOGIN_ERRORS_OCCURRED:
			state = {
				...state,
				loginErrors: action.payload,
			}
			return state
		case LOGIN_SUCCESS:
			state = {
				...state,
				isLoading: false,
				msg: action.payload,
				isLoggedIn: true,
			}
			return state
		case LOGIN_FAILED:
			state = {
				...state,
				isLoading: false,
				msg: action.payload,
			}
			return state

		default:
			return state
	}
}
