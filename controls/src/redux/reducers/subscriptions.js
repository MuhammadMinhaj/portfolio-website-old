import {
	SUBS_IS_LOADING,
	CLEAR_MESSAGE,
	HANDLE_LOADER,
	SUBS_ERROR_OCCURRED,
	SUBS_LOAD_DATA_SUCCESS,
	SUBS_HANDLE_CHANGE_FORM,
	SUBS_HANDLE_SUBMIT_SUCCESS,
	SUBS_HANDLE_SUBMIT_FAILED,
	SUBS_MAIL_DELETED_SUCCESS,
	SUBS_EDIT_EMAIL_HANDLE_CLICK,
	SUBS_EDIT_EMAIL_HANDLE_CHANGE,
	SUBS_EDIT_EMAIL_SUCCESS,
} from '../constants'

const initialState = {
	isLoading: false,
	isUpdating: false,
	error: '',
	success: '',
	emailSender: {
		subject: '',
		message: '',
	},
	editSubscriber: {},
	subscribers: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_MESSAGE:
			state = {
				...state,
				error: '',
				success: '',
			}
			return state
		case HANDLE_LOADER:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case SUBS_IS_LOADING:
			state = {
				...state,
				isUpdating: true,
			}
			return state
		case SUBS_ERROR_OCCURRED:
			state = {
				...state,
				error: action.payload,
				isLoading: false,
				isUpdating: false,
			}
			return state
		case SUBS_LOAD_DATA_SUCCESS:
			state = {
				...state,
				subscribers: [...action.payload.subscribers],
				isLoading: false,
			}
			return state
		case SUBS_HANDLE_CHANGE_FORM:
			state = {
				...state,
				emailSender: {
					...state.emailSender,
					[action.payload.target.name]: action.payload.target.value,
				},
			}
			return state
		case SUBS_HANDLE_SUBMIT_SUCCESS:
			state = {
				...state,
				isLoading: false,
				success: action.payload,
				error: '',
			}
			return state
		case SUBS_HANDLE_SUBMIT_FAILED:
			state = {
				...state,
				isLoading: false,
				error: action.payload,
				success: '',
			}
			return state
		case SUBS_MAIL_DELETED_SUCCESS:
			state = {
				...state,
				isLoading: false,
				success: action.payload.message,
				subscribers: [...action.payload.subscribers],
			}
			return state
		case SUBS_EDIT_EMAIL_HANDLE_CLICK:
			state = {
				...state,
				editSubscriber: action.payload,
			}
			return state
		case SUBS_EDIT_EMAIL_HANDLE_CHANGE:
			state = {
				...state,
				editSubscriber: {
					...state.editSubscriber,
					email: action.payload,
				},
			}
			return state
		case SUBS_EDIT_EMAIL_SUCCESS:
			state = {
				...state,
				subscribers: [...action.payload.subscribers],
				success: action.payload.message,
				error: '',
				isUpdating: false,
			}
			return state
		default:
			return state
	}
}
