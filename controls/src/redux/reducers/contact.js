const {
	CONTACT_CLEAR_MESSAGE,
	HANDLE_LOADER,
	CONTACT_GET_DATA_SUCCESS,
	CONTACT_GET_DATA_FAILED,
	CONTACT_HANDLE_SELECTED_CONTACT_FOR_VIEW,
	CONTACT_HANDLE_SELECTED_ID_REMOVE,
	CONTACT_HANDLE_SUBMIT_DELETE_SUCCESS,
	CONTACT_HANDLE_SUBMIT_DELETE_FAILED,
	CONTACT_HANDLE_SELECTED_MAIL,
	CONTACT_HANDLE_UNSELECT_MAIL,
	CONTACT_HANDLE_CHANGE_SEND_MAIL,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_LOADING,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_ERRORS,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_SUCCESS,
	CONTACT_HANDLE_SUBMIT_SEND_MAIL_FAILED,
} = require('../constants')
const initValues = {
	subject: '',
	message: '',
}

const initialState = {
	isLoading: false,
	isSendingMail: false,
	isOpen: false,
	isSelectedForView: null,
	isSelectedMail: null,
	msg: '',
	mails: [],
	mailSender: initValues,
	mailSenderErrors: initValues,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CONTACT_CLEAR_MESSAGE:
			state = {
				...state,
				msg: '',
			}
			return state
		case HANDLE_LOADER:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case CONTACT_GET_DATA_SUCCESS:
			state = {
				...state,
				mails: [...action.payload],
				isLoading: false,
			}
			return state
		case CONTACT_GET_DATA_FAILED:
			state = {
				...state,
				isLoading: false,
				msg: action.payload,
			}
			return state
		case CONTACT_HANDLE_SELECTED_CONTACT_FOR_VIEW:
			state = {
				...state,
				isSelectedForView: action.payload,
			}
			return state
		case CONTACT_HANDLE_SELECTED_ID_REMOVE:
			state = {
				...state,
				isSelectedForView: null,
			}
			return state
		case CONTACT_HANDLE_SUBMIT_DELETE_SUCCESS:
			state = {
				...state,
				isLoading: false,
				mails: action.payload.mails,
				msg: action.payload.msg,
			}
			return state
		case CONTACT_HANDLE_SUBMIT_DELETE_FAILED:
			state = {
				...state,
				isLoading: false,
				msg: action.payload,
			}
			return state
		case CONTACT_HANDLE_SELECTED_MAIL:
			state = {
				...state,
				isSelectedMail: action.payload,
			}
			return state
		case CONTACT_HANDLE_UNSELECT_MAIL:
			state = {
				...state,
				isSelectedMail: null,
			}
			return state
		case CONTACT_HANDLE_CHANGE_SEND_MAIL:
			state = {
				...state,
				mailSender: {
					...state.mailSender,
					[action.payload.target.name]: action.payload.target.value,
				},
				mailSenderErrors: {
					...state.mailSenderErrors,
					[action.payload.target.name]: '',
				},
			}
			return state
		case CONTACT_HANDLE_SUBMIT_SEND_MAIL_LOADING:
			state = {
				...state,
				isSendingMail: true,
			}
			return state
		case CONTACT_HANDLE_SUBMIT_SEND_MAIL_ERRORS:
			state = {
				...state,
				isSendingMail: false,
				mailSenderErrors: { ...action.payload },
			}
			return state
		case CONTACT_HANDLE_SUBMIT_SEND_MAIL_SUCCESS:
			state = {
				...state,
				msg: action.payload,
				isSendingMail: false,
			}
			return state
		case CONTACT_HANDLE_SUBMIT_SEND_MAIL_FAILED:
			state = {
				...state,
				msg: action.payload,
				isSendingMail: false,
			}
			return state
		default:
			return state
	}
}
