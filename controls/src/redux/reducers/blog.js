// Imported All Types
import {
	HANDLE_LOADER,
	GET_ALL_BLOGS,
	BLOGS_DATA_LOAD_TO_FIELD,
	BLOGS_ALERT_HANDLE_CLOSE,
	BLOGS_TAB_HANDLE_CHANGE,
	BLOGS_SEO_HANDLE_CHANGE,
	BLOGS_MENU_HANDLE_CHANGE,
	BLOGS_CREATE_HANDLE_CHANGE,
	BLOGS_CREATE_HANDLE_SUCCESS,
	BLOGS_GROUP_NAME_HANDLE_CHANGE,
	BLOGS_GROUP_NAME_HANDLE_SUBMIT,
	BLOGS_GROUP_CREATE_SUCCESS,
	BLOGS_GROUP_CREATE_ERROR,
	BLOGS_GROUP_UPDATE_HANDLE_CLICK,
	BLOGS_GROUP_UPDATE_HANDLE_CHANGE,
	BLOGS_GROUP_UPDATE_HANDLE_SUBMIT,
	BLOGS_GROUP_DELETE_HANDLE_SUCCESS,
	BLOGS_GROUP_INDEX_HANDLE_CHANGE,
	BLOGS_GROUP_UPDATE_LOADING,
	BLOGS_TAB_SELECTED_GROUP_ID,
	BLOGS_GET_ALL_BLOGS_POST_SUCCESS,
	// handle post functinality
	BLOGS_POST_SELECTED_EDIT_MODAL,
	BLOGS_POST_UPDATE_HANDLE_CHANGE,
	BLOGS_POST_UPDATE_SUCCESS,
	BLOGS_POST_DELETE_SUCCESS,
	// Error Handling
	BLOGS_HANDLE_ERROR,
} from '../constants'

const initValues = {
	title: '',
	keywords: '',
	content: null,
	group: '',
	file: null,
}
const initialState = {
	isLoading: false,
	isUpdateLoading: false,
	isSeo: false,
	isEditPostOpen: false,
	error: '',
	success: '',
	tabIndex: 0,
	groupIndex: 0,
	groupname: '',
	createBlog: initValues,
	selectedGroup: '',
	selectedTabGroupId: '',
	updateGroup: {},
	updatePost: {
		file: {},
	},
	group: [],
	posts: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_BLOGS:
			state = {
				...state,
				isLoading: false,
				error: '',
				group: action.payload,
			}
			return state
		case HANDLE_LOADER:
			state = {
				...state,
				isLoading: true,
				isEditPostOpen: false,
			}
			return state
		case BLOGS_DATA_LOAD_TO_FIELD:
			state = {
				...state,
				isLoading: false,
				error: action.payload,
			}
			return state
		case BLOGS_ALERT_HANDLE_CLOSE:
			state = {
				...state,
				error: '',
				success: '',
			}
			return state
		case BLOGS_TAB_HANDLE_CHANGE:
			state = {
				...state,
				tabIndex: action.payload,
			}
			return state
		case BLOGS_SEO_HANDLE_CHANGE:
			state = {
				...state,
				isSeo: !state.isSeo,
			}
			return state
		case BLOGS_MENU_HANDLE_CHANGE:
			state = {
				...state,
				selectedGroup: action.payload,
			}
			return state
		case BLOGS_CREATE_HANDLE_CHANGE:
			state = {
				...state,
				createBlog: {
					...state.createBlog,
					[action.payload.target.name]: action.payload.target.value,
				},
			}
			return state
		case BLOGS_CREATE_HANDLE_SUCCESS:
			state = {
				...state,
				createBlog: initValues,
				isLoading: false,
				error: '',
				success: action.payload.message,
				posts: [...state.posts, { ...action.payload.post }],
				selectedGroup: '',
			}
			return state
		case BLOGS_GROUP_NAME_HANDLE_CHANGE:
			state = {
				...state,
				groupname: action.payload,
			}
			return state
		case BLOGS_GROUP_NAME_HANDLE_SUBMIT:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case BLOGS_GROUP_UPDATE_HANDLE_CLICK:
			state = {
				...state,
				updateGroup: action.payload,
			}
			return state
		case BLOGS_GROUP_UPDATE_HANDLE_CHANGE:
			state = {
				...state,
				updateGroup: {
					...state.updateGroup,
					title: action.payload,
				},
			}
			return state
		case BLOGS_GROUP_UPDATE_HANDLE_SUBMIT:
			state = {
				...state,
				group: [...action.payload.group],
				success: action.payload.message,
				isUpdateLoading: false,
			}
			return state
		case BLOGS_GROUP_DELETE_HANDLE_SUCCESS:
			state = {
				...state,
				group: [...action.payload.data],
				success: action.payload.message,
				error: '',
				isLoading: false,
			}
			return state
		case BLOGS_GROUP_INDEX_HANDLE_CHANGE:
			state = {
				...state,
				groupIndex: action.payload,
			}
			return state
		// Errors Handling
		case BLOGS_GROUP_CREATE_ERROR:
			state = {
				...state,
				isLoading: false,
				success: '',
				error: action.payload,
			}
			return state
		case BLOGS_GROUP_CREATE_SUCCESS:
			state = {
				...state,
				group: [
					...state.group,
					{
						...action.payload.blogsGroup,
					},
				],
				groupname: '',
				isLoading: false,
				error: '',
				success: action.payload.message,
			}
			return state
		case BLOGS_HANDLE_ERROR:
			state = {
				...state,
				isLoading: false,
				isUpdateLoading: false,
				error: action.payload,
			}
			return state
		case BLOGS_GROUP_UPDATE_LOADING:
			state = {
				...state,
				isUpdateLoading: !state.isUpdateLoading,
			}
			return state
		case BLOGS_TAB_SELECTED_GROUP_ID:
			state = {
				...state,
				selectedTabGroupId: action.payload,
			}
			return state
		case BLOGS_GET_ALL_BLOGS_POST_SUCCESS:
			state = {
				...state,
				isLoading: false,
				posts: action.payload,
			}
			return state
		case BLOGS_POST_SELECTED_EDIT_MODAL:
			state = {
				...state,
				isEditPostOpen: !state.isEditPostOpen,
				updatePost: {
					...action.payload,
				},
			}
			return state
		case BLOGS_POST_UPDATE_HANDLE_CHANGE:
			state = {
				...state,
				updatePost: {
					...state.updatePost,
					[action.payload.target.name]: action.payload.target.value,
					file: action.payload.target.name === 'file' && action.payload.target.value,
				},
			}
			return state
		case BLOGS_POST_UPDATE_SUCCESS:
			state = {
				...state,
				isEditPostOpen: false,
				isLoading: false,
				posts: action.payload.posts,
				success: action.payload.message,
				updatePost: {},
			}
			return state
		case BLOGS_POST_DELETE_SUCCESS:
			state = {
				...state,
				posts: action.payload.posts,
				success: action.payload.message,
				isLoading: false,
			}
			return state
		default:
			return state
	}
}
