import {
	CLEAR_MESSAGE,
	IS_LOADING_OPENED,
	LOAD_BLOG_DATA_SUCCESS,
	LOAD_BLOG_DATA_FAILED,
	LOAD_PORTFOLIO_DATA_FAILED,
	SEARCH_BLOG_HANDLE_CHANGE,
	CLEAR_SEARCH_HISTORY,
	SELEC_TOPIC_HANDLE_FILTER,
	SELECT_LANGUAGE_TYPE,
	HANDLE_CHANGE_PAGE_NO,
	HANDLE_FILTERED_POSTS,
	HANDLE_CHANGE_ITEM_PER_PAGE,
	HANDLE_CHANGE_DATE_POSTS,
	HANDLE_CHANGE_SUBSCRIBER_MAIL,
	HANDLE_SUBMIT_SUBSCRIBER_MAIL_SUCCESS,
	HANDLE_SUBMIT_SUBSCRIBER_MAIL_FAILED,
	HANDLE_INCREMENT_AND_DECREMENT,
} from '../constants/type'

const initialState = {
	isLoading: false,
	search: null,
	topic: null,
	lang: null,
	day: 'latest',
	itemPerPage: 10,
	totalPages: 0,
	pageNo: 1,
	counter: null,
	error: '',
	subsError: '',
	success: '',
	subscriberEmail: '',
	blogs: [],
	posts: [],
	filteredPosts: [],
}

function toMixed(number) {
	if (Number.isInteger(number)) {
		return number
	} else {
		let intNumLesser = parseInt(number)
		let intNumGreater = Math.round(number)
		if (intNumGreater > intNumLesser) {
			return intNumGreater
		} else {
			return intNumGreater + 1
		}
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_MESSAGE:
			state = {
				...state,
				error: '',
				subsError: '',
				success: '',
			}
			return state
		case IS_LOADING_OPENED:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case LOAD_BLOG_DATA_SUCCESS:
			state = {
				...state,
				blogs: [...action.payload.blogs],
				posts: [...action.payload.posts.reverse()],
				// totalPages: Number((action.payload.posts.length / state.itemPerPage).toFixed()),
				totalPages: toMixed(action.payload.posts.length / state.itemPerPage),
				isLoading: false,
			}
			return state
		case LOAD_BLOG_DATA_FAILED:
			state = {
				...state,
				isLoading: false,
				error: action.payload,
			}
			return state
		case LOAD_PORTFOLIO_DATA_FAILED:
			state = {
				...state,
				isLoading: false,
				error: action.payload,
			}
			return state
		case SEARCH_BLOG_HANDLE_CHANGE:
			state = {
				...state,
				search: action.payload,
				pageNo: 1,
			}
			return state

		case CLEAR_SEARCH_HISTORY:
			state = {
				...state,
				search: '',
			}
			return state
		case SELEC_TOPIC_HANDLE_FILTER:
			state = {
				...state,
				topic: action.payload,
			}
			return state
		case SELECT_LANGUAGE_TYPE:
			state = {
				...state,
				lang: action.payload,
			}
			return state
		case HANDLE_CHANGE_PAGE_NO:
			state = {
				...state,
				pageNo: action.payload,
			}
			return state
		case HANDLE_FILTERED_POSTS:
			state = {
				...state,
				filteredPosts: [...action.payload],
				totalPages: toMixed(action.payload.length / state.itemPerPage),
			}
			return state
		case HANDLE_CHANGE_ITEM_PER_PAGE:
			state = {
				...state,
				itemPerPage: action.payload,
			}
			return state
		case HANDLE_CHANGE_DATE_POSTS:
			state = {
				...state,
				day: action.payload,
			}
			return state
		case HANDLE_CHANGE_SUBSCRIBER_MAIL:
			state = {
				...state,
				subscriberEmail: action.payload,
			}
			return state
		case HANDLE_SUBMIT_SUBSCRIBER_MAIL_SUCCESS:
			state = {
				...state,
				subscriberEmail: '',
				error: '',
				subsError: '',
				success: action.payload,
			}
			return state
		case HANDLE_SUBMIT_SUBSCRIBER_MAIL_FAILED:
			state = {
				...state,
				success: '',
				subsError: action.payload,
			}
			return state
		case HANDLE_INCREMENT_AND_DECREMENT:
			state = {
				...state,
				counter: action.payload,
			}
			return state
		default:
			return state
	}
}
