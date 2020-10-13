import axios from 'axios'
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

// Get All Portfolio Group
export const getPortfolioGroup = () => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const { app, portfolio } = state

		if (portfolio.group.length === 0) {
			dispatch({
				type: PORTFOLIO_LOADING_OPENED,
			})
			try {
				const res = await axios.get(process.env.REACT_APP_URI_GET_PORTFOLIO, {
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
						'x-auth-token': app.accessToken,
					},
				})
				dispatch({
					type: PORTFOLIO_FETCH_NEW_GROUP_DATA,
					payload: res.data,
				})
			} catch (error) {
				dispatch({
					type: PORTFOLIO_ERROR_OCCURRED,
					payload: error.response.message || error.message,
				})
			}
		}
	}
}
export const getPortfolioProjects = () => {
	return async (dispatch, selector) => {
		const state = selector(state => state)

		if (state.portfolio.projects.length === 0) {
			dispatch({
				type: PORTFOLIO_LOADING_OPENED,
			})
			try {
				const res = await axios.get(process.env.REACT_APP_URI_GET_PORTFOLIO_PROJECTS, {
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
						'x-auth-token': state.app.accessToken,
					},
				})
				dispatch({
					type: PORTFOLIO_GET_ALL_PROJECTS_DATA,
					payload: res.data,
				})
			} catch (error) {
				dispatch({
					type: PORTFOLIO_ERROR_OCCURRED,
					payload: error.message,
				})
			}
		}
	}
}
export const handleClearationAll = () => {
	return dispatch => {
		dispatch({
			type: PORTFOLIO_CLEARATION_ALL,
		})
	}
}

export const handleTabIndex = index => {
	return dispatch => {
		dispatch({
			type: PORTFOLIO_TAB_INDEX_HANDLE_CHANGE,
			payload: index,
		})
	}
}
export const createGroupHandleChange = event => {
	event.persist()
	return dispatch => {
		dispatch({
			type: PORTFOLIO_CREATE_GROUP_HANDLE_CHANGE,
			payload: event.target.value,
		})
	}
}

export const createGroupHandleSubmit = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const app = state.app
		const { groupname } = state.portfolio

		// Opening Loader
		dispatch({
			type: PORTFOLIO_LOADING_OPENED,
		})

		if (!groupname) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: 'Please provied name',
			})
			return false
		}
		try {
			const res = await axios.post(
				process.env.REACT_APP_URI_PORTFOLIO_CREATE,
				{ title: groupname },
				{
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
						'x-auth-token': app.accessToken,
					},
				}
			)
			dispatch({
				type: PORTFOLIO_CREATED_GROUP_SUCCESS,
				payload: res.data,
			})
			console.log(res)
		} catch (error) {
			console.log(error.response)
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: error.response.data.message,
			})
		}
	}
}
export const handleSelectUpdateGroup = group => {
	return dispatch => {
		dispatch({
			type: PORTFOLIO_UPDATE_SELECTED_GROUP,
			payload: group,
		})
	}
}

export const handleChangeUpdateGroup = event => {
	event.persist()
	return dispatch => {
		dispatch({
			type: PORTFOLIO_UPDATE_HANDLE_CHANGE,
			payload: event.target.value,
		})
	}
}
export const handleSubmitUpdateGroup = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const { group, updateGroup } = state.portfolio
		dispatch({
			type: PORTFOLIO_LOADING_TOW_OPENED,
		})
		if (!updateGroup.title) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: 'Please provied group name',
			})
			return false
		}
		try {
			const res = await axios.put(
				`${process.env.REACT_APP_URI_PORTFOLIO_UPDATE}/${updateGroup._id}`,
				{ title: updateGroup.title },
				{
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
						'x-auth-token': state.app.accessToken,
					},
				}
			)
			group.forEach(g => {
				if (g._id.toString() === res.data.group._id.toString()) {
					g.title = res.data.group.title
					return false
				}
			})
			dispatch({
				type: PORTFOLIO_UPDATE_GROUP_SUCCESS,
				payload: {
					group,
					message: res.data.message,
				},
			})
		} catch (error) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: error.response.message || error.message,
			})
		}
	}
}

export const handleClickDeleteGroup = id => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		dispatch({
			type: PORTFOLIO_LOADING_OPENED,
		})
		try {
			const res = await axios.delete(`${process.env.REACT_APP_URI_PORTFOLIO_DELETE}/${id}`, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
				},
			})
			const group = state.portfolio.group.filter(g => g._id.toString() !== res.data.group._id.toString())

			dispatch({
				type: PORTFOLIO_GROUP_DELETE_SUCCESS,
				payload: group,
			})
		} catch (error) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: error.response.message || error.message,
			})
		}
	}
}

export const createHandleChange = event => {
	console.log('See your events', event.target)
	if (!event.target) {
		event.target = {
			name: 'tools',
			value: event,
		}
	} else {
		event.persist()
		if (!event.target.name) {
			event.target = {
				name: 'group',
				value: event.target.value,
			}
		}
	}
	return dispatch => {
		dispatch({
			type: PORTFOLIO_CREATE_PROJECT_HANDLE_CHANGE,
			payload: {
				name: event.target.name,
				value: event.target.value,
			},
		})
	}
}
export const createHandleChangeFile = files => {
	console.log(files[0])
	return dispatch => {
		dispatch({
			type: PORTFOLIO_CREATE_PROJECT_FILE_HANDLE_CHANGE,
			payload: files[0],
		})
	}
}

export const createHandleSaveFiles = files => {
	console.log('See latest Updated Files', files)
	let images = []
	files.forEach(file => {
		images.push({ file, title: '' })
	})
	return dispatch => {
		dispatch({
			type: PORTFOLIO_CREATE_PROJECT_SAVE_FILES,
			payload: images,
		})
	}
}
export const handleChangeImageTitle = (e, activeStep) => {
	e.persist()
	return (dispatch, selector) => {
		const state = selector(state => state).portfolio
		let images = state.createProject.images

		images.forEach((img, i) => {
			if (activeStep === i) {
				img.title = e.target.value
				return false
			}
		})
		dispatch({
			type: PORTFOLIO_CREATE_PROJECT_HANDLE_CHANGE_IMAGE,
			payload: images,
		})
	}
}

export const createHandleSubmit = () => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const {
			createProject: { title, thumbnail, link, description, tools, images, group },
		} = state.portfolio
		dispatch({
			type: PORTFOLIO_LOADING_OPENED,
		})

		let error = []
		if (!title) {
			error.push('Title')
		}
		if (Object.keys(thumbnail).length === 0) {
			error.push('Thumbnail')
		}
		if (tools.length === 0) {
			error.push('Tools')
		}
		if (images.length === 0) {
			error.push('Images')
		}
		if (!group) {
			error.push('Group')
		}
		if (error.length !== 0) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: `Please provied all required fields or selection type - You have to must be provied value of ${error.toString()}.`,
			})
			return false
		}
		try {
			const data = new FormData()
			data.append('title', title)
			data.append('thumbnail', thumbnail)
			data.append('link', link)
			data.append('description', description)
			data.append('tools', tools)
			let titles = []
			images.forEach(img => {
				data.append('images', img.file)
				titles.push(img.title)
			})
			data.append('titles', titles)
			const res = await axios.post(`${process.env.REACT_APP_URI_PORTFOLIO_POST_CREATE}/${group}`, data, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
					'Content-Type': 'multipart/form-data',
				},
			})
			dispatch({
				type: PORTFOLIO_CREATE_PROJECT_SUCCESS,
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: error.response.message || error.message,
			})
		}
	}
}

export const handleChangeGroupIndex = index => {
	return dispatch => {
		dispatch({
			type: PORTFOLIO_HANDLE_CHANGE_GROUP_INDEX,
			payload: index,
		})
	}
}
export const handleGroupSelection = id => {
	return dispatch => {
		dispatch({
			type: PORTFOLIO_HANDLE_SELECTED_GROUP,
			payload: id,
		})
	}
}

export const handleClickModal = list => {
	return dispatch => {
		dispatch({
			type: PORTFOLIO_HANDLE_CLICK_EDIT_MODAL,
			payload: list,
		})
	}
}
export const handleChangeUpdateProject = event => {
	if (!event.target) {
		event.target = {
			name: 'tools',
			value: event.toString(),
		}
	} else {
		event.persist()
		if (!event.target.name) {
			event.target = {
				name: 'group',
				value: event.target.value,
			}
		}
	}
	return dispatch => {
		dispatch({
			type: PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE,
			payload: {
				name: event.target.name,
				value: event.target.value,
			},
		})
	}
}
export const handleChangeFileUpdate = file => {
	return dispatch => {
		dispatch({
			type: PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_FILE,
			payload: file,
		})
	}
}
export const handleChangeFilesUpdate = files => {
	console.log(files)
	const images = []
	files.forEach(file => {
		images.push({ path: file, title: '' })
	})
	return dispatch => {
		dispatch({
			type: PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_FILES,
			payload: images,
		})
	}
}
export const handleChangeUpdateImgTitle = (e, index) => {
	e.persist()
	return (dispatch, selector) => {
		const {
			updateProject: { images },
		} = selector(state => state).portfolio
		images[index].title = e.target.value
		dispatch({
			type: PORTFOLIO_PROJECT_UPDATE_HANDLE_CHANGE_IMG_TITLE,
			payload: images,
		})
	}
}

export const handleChangeDeleteImg = activeImg => {
	return (dispatch, selector) => {
		const {
			updateProject: { images },
		} = selector(state => state).portfolio
		const deletedId = images[activeImg]._id
		const updatedImages = images.filter((img, i) => i !== activeImg)
		dispatch({
			type: PROTFOLIO_PROJECT_UPDATE_HANDLE_DELETE_IMG,
			payload: { updatedImages, deletedId },
		})
	}
}

export const updateHandleSubmit = e => {
	e.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const {
			updateProject: { _id, title, thumbnail, link, description, tools, images, group, imgDeleteId },
			projects,
		} = state.portfolio
		dispatch({
			type: PORTFOLIO_LOADING_TOW_OPENED,
		})

		let error = []
		if (!title) {
			error.push('Title')
		}
		if (Object.keys(thumbnail).length === 0) {
			error.push('Thumbnail')
		}
		if (tools.length === 0) {
			error.push('Tools')
		}
		if (images.length === 0) {
			error.push('Images')
		}
		if (!group) {
			error.push('Group')
		}
		if (error.length !== 0) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: `Please provied all required fields or selection type - You have to must be provied value of ${error.toString()}.`,
			})
			return false
		}
		const newImages = []
		const oldImages = []
		images.forEach(img => {
			if (typeof img.path !== 'string') {
				newImages.push(img)
			} else {
				oldImages.push(img)
			}
		})

		try {
			const data = new FormData()
			data.append('title', title)
			data.append('thumbnail', thumbnail)
			data.append('link', link)
			data.append('description', description)
			data.append('tools', tools)
			data.append('imgDeleteId', imgDeleteId.toString())
			data.append('oldImages', JSON.stringify(oldImages))
			data.append('group', group)
			let titles = []
			newImages.forEach(img => {
				titles.push(img.title)
				data.append('images', img.path)
			})

			data.append('titles', titles)

			const res = await axios.put(`${process.env.REACT_APP_URI_PORTFOLIO_POST_UPDATE}/${_id}`, data, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
					'Content-Type': 'multipart/form-data',
				},
			})

			projects.forEach(p => {
				if (p._id.toString() === res.data.project._id.toString()) {
					p.description = res.data.project.description
					p.group = res.data.project.group
					p.images = res.data.project.images
					p.link = res.data.project.link
					p.thumbnail = res.data.project.thumbnail
					p.title = res.data.project.title
					p.tools = res.data.project.tools
				}
			})

			dispatch({
				type: PORTFOLIO_PROJECT_UPDATE_SUCCESS,
				payload: {
					message: res.data.message,
					projects,
				},
			})
		} catch (error) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: error.response.message || error.message,
			})
		}
	}
}

export const handleClickDeleteProject = id => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		dispatch({
			type: PORTFOLIO_LOADING_OPENED,
		})
		try {
			const res = await axios.delete(`${process.env.REACT_APP_URI_PORTFOLIO_POST_DELETE}/${id}`, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
				},
			})

			const projects = state.portfolio.projects.filter(p => p._id.toString() !== res.data.project._id.toString())

			dispatch({
				type: PROTFOLIO_PROJECT_DELETED_SUCCESS,
				payload: { projects, message: res.data.message },
			})
		} catch (error) {
			dispatch({
				type: PORTFOLIO_ERROR_OCCURRED,
				payload: error.response ? error.response.message || error.message : error.message,
			})
		}
	}
}
