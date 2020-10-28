import {
	IS_LOADING_OPENED,
	LOAD_PORTFOLIO_DATA_SUCCESS,
	LOAD_PORTFOLIO_DATA_FAILED,
	HANDLE_ITEM_MODAL,
	HANDLE_TAB_CLICK,
	HANDLE_TAB_CLICK_SELECTED_GROUP,
	HANDLE_PAGINATION,
	HANDLE_PORTFOLIO_SEARCH,
} from '../constants/type'

const initalState = {
	isOpenModal: false,
	isLoading: false,
	error: '',
	modalItem: {},
	correntTab: 0,
	exactPage: 1,
	itemPerPage: 6,
	avoidPage: 0,
	searchTerms: '',
	groupId: null,
	groups: [],
	projects: [],
}

const reducer = (state = initalState, action) => {
	switch (action.type) {
		case IS_LOADING_OPENED:
			state = {
				...state,
				isLoading: true,
			}
			return state
		case LOAD_PORTFOLIO_DATA_SUCCESS:
			state = {
				...state,
				groups: [...action.payload.groups],
				projects: [...action.payload.projects],
				isLoading: false,
				groupId: action.payload.groups[0]._id,
				error: '',
			}
			return state
		case LOAD_PORTFOLIO_DATA_FAILED:
			state = {
				...state,
				error: action.payload,
				isLoading: false,
			}
			return state
		case HANDLE_ITEM_MODAL:
			state = {
				...state,
				isOpenModal: !state.isOpenModal,
				modalItem: { ...action.payload },
			}
			return state
		case HANDLE_TAB_CLICK:
			state = {
				...state,
				correntTab: action.payload,
				exactPage: 1,
				itemPerPage: 6,
				avoidPage: 0,
			}
			return state
		case HANDLE_TAB_CLICK_SELECTED_GROUP:
			state = {
				...state,
				groupId: action.payload,
			}
			return state
		case HANDLE_PAGINATION:
			state = {
				...state,
				exactPage: action.payload,
				avoidPage: action.payload * state.itemPerPage - state.itemPerPage,
			}
			return state

		case HANDLE_PORTFOLIO_SEARCH:
			state = {
				...state,
				searchTerms: action.payload,
			}
			return state
		default:
			return state
	}
}

export default reducer
