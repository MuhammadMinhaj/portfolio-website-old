import {
	PORTFOLIO_CLEARATION_ALL,
	PORTFOLIO_ERROR_OCCURRED,
	PORTFOLIO_LOADING_OPENED,
	PORTFOLIO_LOADING_TOW_OPENED,
	PORTFOLIO_FETCH_NEW_GROUP_DATA,
	PORTFOLIO_GET_ALL_PROJECTS_DATA,
	PORTFOLIO_TAB_INDEX_HANDLE_CHANGE,
	PORTFOLIO_CREATE_GROUP_HANDLE_CHANGE,
	PORTFOLIO_CREATED_GROUP_SUCCESS,
	PORTFOLIO_UPDATE_SELECTED_GROUP,
	PORTFOLIO_UPDATE_HANDLE_CHANGE,
	PORTFOLIO_UPDATE_GROUP_SUCCESS,
	PORTFOLIO_GROUP_DELETE_SUCCESS,
	PORTFOLIO_CREATE_PROJECT_FILE_HANDLE_CHANGE,
	PORTFOLIO_CREATE_PROJECT_HANDLE_CHANGE,
	PORTFOLIO_CREATE_PROJECT_SAVE_FILES,
	PORTFOLIO_CREATE_PROJECT_HANDLE_CHANGE_IMAGE,
	PORTFOLIO_CREATE_PROJECT_SUCCESS,
	PORTFOLIO_HANDLE_CHANGE_GROUP_INDEX,
	PORTFOLIO_HANDLE_SELECTED_GROUP,
	PORTFOLIO_HANDLE_CLICK_EDIT_MODAL,
	PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE,
	PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_FILE,
	PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_FILES,
	PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_IMG_TITLE,
	PROTFOLIO_PROJECT_UPDATE_HANDLE_DELETE_IMG,
	PORTFOLIO_PROJECT_UPDATE_SUCCESS,
	PROTFOLIO_PROJECT_DELETED_SUCCESS,
} from '../constants'
const initValues = {
	title: '',
	thumbnail: {},
	link: '',
	description: '',
	client: '',
	industry: '',
	time: '',
	tools: [],
	images: [],
	group: '',
}
const initialState = {
	error: '',
	success: '',
	isLoading: false,
	isLoadingTow: false,
	tabIndex: 0,
	groupname: '',
	group: [],
	projects: [],
	updateGroup: {},
	createProject: initValues,
	groupIndex: 0,
	selectedGroup: null,
	isUpdateModal: false,
	updateProject: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case PORTFOLIO_CLEARATION_ALL:
			state = {
				...state,
				error: '',
				success: '',
				isLoading: false,
				isLoadingTow: false,
			}
			return state
		case PORTFOLIO_ERROR_OCCURRED:
			state = {
				...state,
				error: action.payload,
				isLoading: false,
				isLoadingTow: false,
			}
			return state
		case PORTFOLIO_LOADING_OPENED:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case PORTFOLIO_LOADING_TOW_OPENED:
			state = {
				...state,
				isLoadingTow: true,
			}
			return state
		case PORTFOLIO_FETCH_NEW_GROUP_DATA:
			state = {
				...state,
				group: [...action.payload.group],
				success: '',
				error: '',
				isLoading: false,
			}
			return state
		case PORTFOLIO_GET_ALL_PROJECTS_DATA:
			state = {
				...state,
				projects: [...action.payload.projects],
				isLoading: false,
				error: '',
				success: '',
			}
			return state
		case PORTFOLIO_TAB_INDEX_HANDLE_CHANGE:
			state = {
				...state,
				tabIndex: action.payload,
			}
			return state
		case PORTFOLIO_CREATE_GROUP_HANDLE_CHANGE:
			state = {
				...state,
				groupname: action.payload,
			}
			return state
		case PORTFOLIO_CREATED_GROUP_SUCCESS:
			state = {
				...state,
				error: '',
				groupname: '',
				success: action.payload.message,
				group: [...state.group, action.payload.group],
				isLoadingTow: false,
				isLoading: false,
			}
			return state
		case PORTFOLIO_UPDATE_SELECTED_GROUP:
			state = {
				...state,
				updateGroup: { ...action.payload },
			}
			return state
		case PORTFOLIO_UPDATE_HANDLE_CHANGE:
			state = {
				...state,
				updateGroup: {
					...state.updateGroup,
					title: action.payload,
				},
			}
			return state
		case PORTFOLIO_UPDATE_GROUP_SUCCESS:
			state = {
				...state,
				success: action.payload.message,
				group: action.payload.group,
				isLoading: false,
				isLoadingTow: false,
			}
			return state
		case PORTFOLIO_GROUP_DELETE_SUCCESS:
			state = {
				...state,
				error: '',
				success: action.payload.message,
				group: action.payload.group,
				isLoadingTow: false,
				isLoading: false,
			}
			return state
		case PORTFOLIO_CREATE_PROJECT_FILE_HANDLE_CHANGE:
			state = {
				...state,
				createProject: {
					...state.createProject,
					thumbnail: action.payload,
				},
			}
			return state
		case PORTFOLIO_CREATE_PROJECT_HANDLE_CHANGE:
			state = {
				...state,
				createProject: {
					...state.createProject,
					[action.payload.name]: action.payload.value,
				},
			}
			return state
		case PORTFOLIO_CREATE_PROJECT_SAVE_FILES:
			state = {
				...state,
				createProject: {
					...state.createProject,
					images: action.payload,
				},
			}
			return state
		case PORTFOLIO_CREATE_PROJECT_HANDLE_CHANGE_IMAGE:
			state = {
				...state,
				createProject: {
					...state.createProject,
					images: action.payload,
				},
			}
			return state
		case PORTFOLIO_CREATE_PROJECT_SUCCESS:
			state = {
				...state,
				isLoading: false,
				error: '',
				success: action.payload.message,
			}
			return state
		case PORTFOLIO_HANDLE_CHANGE_GROUP_INDEX:
			state = {
				...state,
				groupIndex: action.payload,
			}
			return state
		case PORTFOLIO_HANDLE_SELECTED_GROUP:
			state = {
				...state,
				selectedGroup: action.payload,
			}
			return state
		case PORTFOLIO_HANDLE_CLICK_EDIT_MODAL:
			state = {
				...state,
				isUpdateModal: !state.isUpdateModal,
				updateProject: action.payload ? { ...action.payload, imgDeleteId: [] } : null,
			}
			return state
		case PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE:
			state = {
				...state,
				updateProject: {
					...state.updateProject,
					[action.payload.name]: action.payload.value,
				},
			}
			return state
		case PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_FILE:
			state = {
				...state,
				updateProject: {
					...state.updateProject,
					thumbnail: action.payload ? (Object.keys(action.payload).length !== 0 ? action.payload : state.updateProject.thumbnail) : {},
				},
			}
			return state
		case PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_FILES:
			state = {
				...state,
				updateProject: {
					...state.updateProject,
					images: [...state.updateProject.images, ...action.payload],
				},
			}
			return state
		case PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_IMG_TITLE:
			state = {
				...state,
				updateProject: {
					...state.updateProject,
					images: action.payload,
				},
			}
			return state
		case PROTFOLIO_PROJECT_UPDATE_HANDLE_DELETE_IMG:
			state = {
				...state,
				updateProject: {
					...state.updateProject,
					images: action.payload.updatedImages,
					imgDeleteId: [...state.updateProject.imgDeleteId, action.payload.deletedId],
				},
			}
			return state
		case PORTFOLIO_PROJECT_UPDATE_SUCCESS:
			state = {
				...state,
				isLoading: false,
				isLoadingTow: false,
				error: '',
				success: action.payload.message,
				projects: action.payload.projects,
			}
			return state
		case PROTFOLIO_PROJECT_DELETED_SUCCESS:
			state = {
				...state,
				projects: action.payload.projects,
				success: action.payload.message,
				isLoading: false,
				isLoadingTow: false,
				error: '',
			}
			return state
		default:
			return state
	}
}
