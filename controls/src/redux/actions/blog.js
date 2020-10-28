import {
	HANDLE_LOADER,
	GET_ALL_BLOGS,
	BLOGS_DATA_LOAD_TO_FIELD,
	BLOGS_ALERT_HANDLE_CLOSE,
	BLOGS_TAB_HANDLE_CHANGE,
	BLOGS_SEO_HANDLE_CHANGE,
	BLOGS_MENU_HANDLE_CHANGE,
	BLOGS_GROUP_CREATE_ERROR,
	BLOGS_GROUP_CREATE_SUCCESS,
	BLOGS_CREATE_HANDLE_CHANGE,
	BLOGS_CREATE_HANDLE_SUCCESS,
	BLOGS_GROUP_NAME_HANDLE_CHANGE,
	BLOGS_GROUP_NAME_HANDLE_SUBMIT,
	BLOGS_GROUP_UPDATE_HANDLE_CLICK,
	BLOGS_GROUP_UPDATE_HANDLE_CHANGE,
	BLOGS_GROUP_UPDATE_HANDLE_SUBMIT,
	BLOGS_GROUP_DELETE_HANDLE_SUCCESS,
	BLOGS_GROUP_INDEX_HANDLE_CHANGE,
	BLOGS_GROUP_UPDATE_LOADING,
	BLOGS_TAB_SELECTED_GROUP_ID,
	BLOGS_GET_ALL_BLOGS_POST_SUCCESS,
	// functinality handle
	BLOGS_POST_SELECTED_EDIT_MODAL,
	BLOGS_POST_UPDATE_HANDLE_CHANGE,
	BLOGS_POST_UPDATE_SUCCESS,
	BLOGS_POST_DELETE_SUCCESS,

	// Error
	BLOGS_HANDLE_ERROR,
} from '../constants'

import axios from 'axios'

// Ajax request for get data
export const getBlogsHandle = () => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		if (state.blog.group.length === 0) {
			dispatch({
				type: HANDLE_LOADER,
			})
		}
		try {
			if (state.blog.group.length === 0) {
				const res = await axios.get(process.env.REACT_APP_URI_GET_BLOGS, {
					headers: {
						'x-auth-token': state.app.accessToken,
						'x-api-key': process.env.REACT_APP_API_KEY,
					},
				})
				dispatch({
					type: GET_ALL_BLOGS,
					payload: res.data.blogs,
				})
			}
		} catch (e) {
			dispatch({
				type: BLOGS_DATA_LOAD_TO_FIELD,
				payload: e.message,
			})
		}
	}
}

export const alertHandleClose = () => {
	return dispatch => {
		dispatch({ type: BLOGS_ALERT_HANDLE_CLOSE })
	}
}

export const handleTabChange = value => {
	return dispatch => {
		dispatch({
			type: BLOGS_TAB_HANDLE_CHANGE,
			payload: value,
		})
	}
}

export const handleSeoChange = () => {
	return dispatch => {
		dispatch({
			type: BLOGS_SEO_HANDLE_CHANGE,
		})
	}
}

export const handleMenuChange = event => {
	return dispatch => {
		dispatch({
			type: BLOGS_MENU_HANDLE_CHANGE,
			payload: event.target.value,
		})
	}
}

export const createBlogHandleChange = (event, isFile) => {
	// console.log('This is a value', event.target.files)
	if (isFile) {
		event.target = {
			name: 'file',
			value: event[0],
		}
	} else {
		if (!event.target) {
			event.target = {
				name: 'content',
				value: JSON.stringify(event),
			}
		} else {
			if (!event.target.name) {
				event.target = {
					name: 'lang',
					value: event.target.value,
				}
			}
			event.persist()
		}
	}

	return dispatch => {
		dispatch({
			type: BLOGS_CREATE_HANDLE_CHANGE,
			payload: event,
		})
	}
}
// Create Blogs Post
export const createBlogHandleSubmit = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const { createBlog, selectedGroup } = state.blog
		const { title, keywords, content, file, lang } = createBlog

		dispatch({
			type: HANDLE_LOADER,
		})

		if (!title || !content || !lang) {
			dispatch({
				type: BLOGS_HANDLE_ERROR,
				payload: 'Title & content & lang is required',
			})
			return false
		}
		const data = new FormData()
		data.append('title', title)
		data.append('keywords', keywords)
		data.append('content', content)
		data.append('lang', lang)
		data.append('thumbnail', file)
		try {
			const res = await axios.post(`${process.env.REACT_APP_URI_BLOGS_POST_CREATE}/${selectedGroup}`, data, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
					'Content-Type': 'multipart/form-data',
				},
			})
			dispatch({
				type: BLOGS_CREATE_HANDLE_SUCCESS,
				payload: res.data,
			})
		} catch (e) {
			console.log(e.response)
			dispatch({
				type: BLOGS_HANDLE_ERROR,
				payload: e.message,
			})
		}
	}
}
export const handleGroupNameChange = e => {
	let payload
	if (e.target) {
		e.persist()
		payload = {
			name: 'groupname',
			value: e.target.value,
		}
	} else {
		payload = {
			name: 'thumbnail',
			value: e[0],
		}
	}

	return dispatch => {
		dispatch({
			type: BLOGS_GROUP_NAME_HANDLE_CHANGE,
			payload,
		})
	}
}

// Ajax request for create group of blogs
export const handleGroupNameSubmit = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)

		const {
			blogCreation: { groupname, thumbnail },
		} = state.blog
		dispatch({
			type: BLOGS_GROUP_NAME_HANDLE_SUBMIT,
		})
		if (!groupname) {
			dispatch({
				type: BLOGS_GROUP_CREATE_ERROR,
				payload: 'Please provied blog name',
			})
			return false
		}
		try {
			const data = new FormData()
			data.append('title', groupname)
			data.append('thumbnail', thumbnail)

			const res = await axios.post(process.env.REACT_APP_URI_BLOGS_CREATE, data, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
				},
			})
			dispatch({
				type: BLOGS_GROUP_CREATE_SUCCESS,
				payload: res.data,
			})
		} catch (error) {
			console.log(error.response)
			dispatch({
				type: BLOGS_GROUP_CREATE_ERROR,
				payload: error.message,
			})
		}
	}
}

export const handleClickUpdateGroup = item => {
	return dispatch => {
		dispatch({
			type: BLOGS_GROUP_UPDATE_HANDLE_CLICK,
			payload: item,
		})
	}
}

export const handleChangeUpdateGroup = event => {
	let payload
	if (event.target) {
		event.persist()
		payload = {
			name: 'title',
			value: event.target.value,
		}
	} else {
		payload = {
			name: 'thumbnail',
			value: event[0],
		}
	}

	return dispatch => {
		dispatch({
			type: BLOGS_GROUP_UPDATE_HANDLE_CHANGE,
			payload: payload,
		})
	}
}

// Ajax request for update group name
export const handleSubmitUpdateGroup = event => {
	event.preventDefault()

	return async (dispatch, selector) => {
		dispatch({
			type: BLOGS_GROUP_UPDATE_LOADING,
		})

		try {
			const { app, blog } = selector(state => state)

			let { group, updateGroup } = blog

			const data = new FormData()
			data.append('title', updateGroup.title)
			data.append('thumbnail', updateGroup.thumbnail)

			const res = await axios.put(`${process.env.REACT_APP_URI_BLOGS_UPDATE}/${updateGroup._id}`, data, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': app.accessToken,
				},
			})
			group.forEach(g => {
				if (g._id === res.data.group._id) {
					g.title = res.data.group.title
					g.thumbnail = res.data.group.thumbnail
					return false
				}
			})
			console.log(group)
			dispatch({
				type: BLOGS_GROUP_UPDATE_HANDLE_SUBMIT,
				payload: {
					group,
					message: res.data.message,
				},
			})
		} catch (e) {
			dispatch({
				type: BLOGS_HANDLE_ERROR,
				payload: e.message,
			})
		}
	}
}

// Ajax request for delete group
export const handleClickDeleteGroup = id => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const blog = state.blog

		dispatch({
			type: HANDLE_LOADER,
		})

		try {
			const res = await axios.delete(`${process.env.REACT_APP_URI_BLOGS_DELETE}/${id}`, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
				},
			})
			let group = blog.group.filter(g => g._id !== res.data.group._id)

			dispatch({
				type: BLOGS_GROUP_DELETE_HANDLE_SUCCESS,
				payload: {
					data: group,
					message: res.data.message,
				},
			})
		} catch (e) {
			dispatch({
				type: BLOGS_HANDLE_ERROR,
				payload: e.message,
			})
		}
	}
}

export const handleChangeGroupIndex = index => {
	return dispatch => {
		dispatch({
			type: BLOGS_GROUP_INDEX_HANDLE_CHANGE,
			payload: index,
		})
	}
}

// All Blogs
export const handleTabSelectedGroupId = id => {
	return dispatch => {
		dispatch({
			type: BLOGS_TAB_SELECTED_GROUP_ID,
			payload: id,
		})
	}
}
// Ajax Request For Get All Posts
export const getAllPostsRequest = () => {
	return async (dispatch, selector) => {
		const state = selector(state => state)
		if (state.blog.posts.length !== 0) {
			return false
		}
		dispatch({
			type: HANDLE_LOADER,
		})
		try {
			const res = await axios.get(process.env.REACT_APP_URI_GET_BLOGS_POSTS, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
				},
			})
			dispatch({
				type: BLOGS_GET_ALL_BLOGS_POST_SUCCESS,
				payload: res.data.posts,
			})
		} catch (e) {
			console.log(e.response)
			dispatch({
				type: BLOGS_HANDLE_ERROR,
				payload: e.message,
			})
		}
	}
}

export const selectedPostUpdateModal = post => {
	return dispatch => {
		dispatch({
			type: BLOGS_POST_SELECTED_EDIT_MODAL,
			payload: post,
		})
	}
}
export const postUpdateHandleChange = (event, isFile) => {
	if (isFile) {
		event.target = {
			name: 'thumbnail',
			value: event[0],
		}
	} else {
		if (!event.target) {
			event.target = {
				name: 'content',
				value: JSON.stringify(event),
			}
		} else {
			if (!event.target.name) {
				event.target = {
					name: 'lang',
					value: event.target.value,
				}
			}
			if (event.persist) {
				event.persist()
			}
		}
	}

	return dispatch => {
		dispatch({
			type: BLOGS_POST_UPDATE_HANDLE_CHANGE,
			payload: event,
		})
	}
}
// Update blogs post by id
export const handleUpdateBlogsPost = event => {
	event.preventDefault()
	return async (dispatch, selector) => {
		const state = selector(state => state)
		const { updatePost, posts } = state.blog

		dispatch({
			type: HANDLE_LOADER,
		})
		try {
			const data = new FormData()
			data.append('title', updatePost.title)
			data.append('content', updatePost.content)
			data.append('keywords', updatePost.keywords)
			data.append('lang', updatePost.lang)
			data.append('group', updatePost.group)
			data.append('thumbnail', updatePost.thumbnail)
			const res = await axios.put(`${process.env.REACT_APP_URI_BLOGS_POST_UPDATE}/${updatePost._id}`, data, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
					'Content-Type': 'multipart/form-data',
				},
			})

			posts.forEach(post => {
				if (post._id.toString() === updatePost._id.toString()) {
					post.title = res.data.post.title
					post.content = res.data.post.content
					post.keywords = res.data.post.keywords
					post.thumbnail = res.data.post.thumbnail
					post.lang = res.data.post.lang
					post.group = res.data.post.group
					return false
				}
			})

			dispatch({
				type: BLOGS_POST_UPDATE_SUCCESS,
				payload: {
					message: res.data.message,
					posts,
				},
			})
		} catch (e) {
			console.log(e.response)
			dispatch({
				type: BLOGS_HANDLE_ERROR,
				payload: e.message,
			})
		}
	}
}
export const handleDeleteBlogsPost = post => {
	return async (dispatch, selector) => {
		const state = selector(state => state)

		dispatch({
			type: HANDLE_LOADER,
		})
		try {
			const res = await axios.delete(`${process.env.REACT_APP_URI_BLOGS_POST_DELETE}/${post._id}`, {
				headers: {
					'x-api-key': process.env.REACT_APP_API_KEY,
					'x-auth-token': state.app.accessToken,
				},
			})

			const newPosts = state.blog.posts.filter(p => p._id.toString() !== res.data.post._id.toString())
			dispatch({
				type: BLOGS_POST_DELETE_SUCCESS,
				payload: {
					posts: newPosts,
					message: res.data.message,
				},
			})
		} catch (e) {
			dispatch({
				type: BLOGS_HANDLE_ERROR,
				payload: e.message,
			})
		}
	}
}
