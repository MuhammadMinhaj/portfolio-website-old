import {
	SUBS_HANDLE_REQ_SORT,
	SUBS_HANDLE_SELECTED_ALL_CLICK,
	SUBS_HANDLE_CLICK,
	SUBS_HANDLE_CHANGE_PAGE,
	SUBS_HANDLE_CHANGE_ROWS_PER_PAGE,
	SUBS_HANDLE_CHANGE_DENSE,
	SUBS_HANDLE_CHANGE_FORM,
	SUBS_HANDLE_SUBMIT_FORM,
} from '../constants'

const createEmailData = (id, email) => {
	return { id, email }
}

const initialState = {
	order: 'asc',
	orderBy: 'email',
	selected: [],
	page: 0,
	dense: false,
	rowsPerPage: 5,
	emailSender: {
		subject: '',
		message: '',
	},
	emails: [
		createEmailData('1', 'mdminhajctg24@gmail.com'),
		createEmailData('2', 'minhaj24@gmail.com'),
		createEmailData('3', 'towsif@gmail.com'),
		createEmailData('4', 'asif@gmail.com'),
		createEmailData('5', 'robiul@gmail.com'),
		createEmailData('6', 'ashek@gmail.com'),
		createEmailData('7', 'rahman@gmail.com'),
	],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SUBS_HANDLE_REQ_SORT:
			state = {
				...state,
				order: action.payload.order,
				orderBy: action.payload.orderBy,
			}
			return state
		case SUBS_HANDLE_SELECTED_ALL_CLICK:
			state = {
				...state,
				selected: action.payload,
			}
			return state
		case SUBS_HANDLE_CLICK:
			state = {
				...state,
				selected: action.payload,
			}
			return state
		case SUBS_HANDLE_CHANGE_PAGE:
			state = {
				...state,
				page: action.payload,
			}
			return state
		case SUBS_HANDLE_CHANGE_ROWS_PER_PAGE:
			state = {
				...state,
				rowsPerPage: action.payload,
				page: 0,
			}
			return state
		case SUBS_HANDLE_CHANGE_DENSE:
			state = {
				...state,
				dense: action.payload,
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
		case SUBS_HANDLE_SUBMIT_FORM:
			state = {
				...state,
				emailSender: {
					subject: '',
					message: '',
				},
			}
			return state
		default:
			return state
	}
}
