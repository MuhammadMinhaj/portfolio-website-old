import {
	BLOG_HANDLE_DRAWER,
	BLOG_HANDLE_DRAWER_MOBILE,
	BLOG_HANDLE_COLLAPSE,
	BLOG_HANDLE_SELECTED_POST,
	BLOG_HANDLE_MATCHED_URL_PARAMS,
	BLOG_HANDLE_SEARCH,
	BLOG_HANDLE_CLEAR_SEARCH,
} from '../constants/type'

const posts = [
	{
		title: 'How To Learn Javascript',
		content: 'Assalamu Alaikum,Today we are going to learn how can we learn js as a bigganners',
	},
	{
		title: 'How To Learn Typscript',
		content: 'Assalamu Alaikum,Today we are going to learn how can we learn TS as a bigganners',
	},
	{
		title: 'How To Learn Python',
		content: 'Assalamu Alaikum,Today we are going to learn how can we learn Python as a bigganners',
	},
	{
		title: 'How To Learn Django',
		content: 'Assalamu Alaikum,Today we are going to learn how can we learn Django as a bigganners',
	},
]

const initialState = {
	isOpneDrawer: true,
	collapseIndex: 0,
	selectedPost: null,
	post: undefined,
	isLoading: true,
	querySearch: '',
	contents: [
		{
			title: 'Programming',
			posts,
		},
		{
			title: 'Utils',
			posts,
		},
		{
			title: 'Math',
			posts,
		},
	],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case BLOG_HANDLE_DRAWER:
			state = {
				...state,
				isOpneDrawer: !state.isOpneDrawer,
			}
			return state
		case BLOG_HANDLE_DRAWER_MOBILE:
			state = {
				...state,
				isOpneDrawer: action.payload,
			}
			return state
		case BLOG_HANDLE_COLLAPSE:
			state = {
				...state,
				collapseIndex: state.collapseIndex === action.payload ? null : action.payload,
				selectedPost: null,
			}
			return state
		case BLOG_HANDLE_SELECTED_POST:
			state = {
				...state,
				selectedPost: action.payload,
			}
			return state
		case BLOG_HANDLE_MATCHED_URL_PARAMS:
			state = {
				...state,
				post: action.payload.post,
				collapseIndex: action.payload.collapseIndex,
				selectedPost: action.payload.selectedPost,
				isLoading: false,
			}
			return state
		case BLOG_HANDLE_SEARCH:
			state = {
				...state,
				querySearch: action.payload.trim(),
			}
			return state
		case BLOG_HANDLE_CLEAR_SEARCH:
			state = {
				...state,
				querySearch: '',
			}
			return state
		default:
			return state
	}
}
export default reducer
