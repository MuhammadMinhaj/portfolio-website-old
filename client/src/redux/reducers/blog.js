import {
	IS_LOADING_OPENED,
	LOAD_BLOG_DATA_SUCCESS,
	LOAD_BLOG_DATA_FAILED,
	LOAD_PORTFOLIO_DATA_FAILED,
	SEARCH_BLOG_HANDLE_CHANGE,
} from '../constants/type'

const initialState = {
	isLoading: false,
	search: '',
	error: '',
	blogs: [],
	posts: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case IS_LOADING_OPENED:
			state = {
				isLoading: true,
			}
			return state
		case LOAD_BLOG_DATA_SUCCESS:
			state = {
				blogs: [...action.payload.blogs],
				posts: [...action.payload.posts],
			}
			return state
		case LOAD_PORTFOLIO_DATA_FAILED:
			state = {
				isLoading: false,
				error: action.payload,
			}
			return state
		case SEARCH_BLOG_HANDLE_CHANGE:
			state = {
				...state,
				search: action.payload,
			}
			return state
		default:
			return state
	}
}
