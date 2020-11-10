import axios from 'axios'
import {
	CLEAR_MESSAGE,
	IS_LOADING_OPENED,
	LOAD_BLOG_DATA_SUCCESS,
	LOAD_BLOG_DATA_FAILED,
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

export const getDataFromServer = () => {
	return async (dispatch, selector) => {
		const state = selector(state => state).blog
		if (state.posts.length === 0) {
			dispatch({
				type: IS_LOADING_OPENED,
			})
			try {
				const res = await axios.get(process.env.REACT_APP_URI_GET_DATA_BLOGS, {
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
					},
				})
				dispatch({
					type: LOAD_BLOG_DATA_SUCCESS,
					payload: res.data,
				})
			} catch (e) {
				dispatch({
					type: LOAD_BLOG_DATA_FAILED,
					payload: e.message,
				})
			}
		}
	}
}

export const handleClearMessage = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_MESSAGE,
		})
	}
}
export const handleChangeSearch = value => {
	return dispatch => {
		dispatch({
			type: SEARCH_BLOG_HANDLE_CHANGE,
			payload: value,
		})
	}
}

export const clearSearchHistory = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_SEARCH_HISTORY,
		})
	}
}
export const selectTopicHandler = e => {
	return dispatch => {
		dispatch({
			type: SELEC_TOPIC_HANDLE_FILTER,
			payload: e.target.value === 'all' ? '' : e.target.value,
		})
	}
}

export const selectLangugaeHandler = e => {
	return dispatch => {
		dispatch({
			type: SELECT_LANGUAGE_TYPE,
			payload: e.target.value === 'all' ? '' : e.target.value,
		})
	}
}

export const handleChangePageNo = no => {
	return dispatch => {
		dispatch({
			type: HANDLE_CHANGE_PAGE_NO,
			payload: no,
		})
	}
}

const filterByDay = (posts, day) => {
	const postLater = []
	if (day === 'latest') {
		return posts
	}
	posts.forEach(p => {
		let oldDate = p.createdAt.split(' ')
		let CurrentDate = new Date().toUTCString().split(' ')
		if (day === 'week') {
			if (oldDate[2] === CurrentDate[2] && oldDate[3] === CurrentDate[3] && Number(oldDate[1]) >= Number(CurrentDate[1]) - 7) {
				postLater.push(p)
			}
		} else if (day === 'month') {
			if (oldDate[2] === CurrentDate[2] && oldDate[3] === CurrentDate[3]) {
				postLater.push(p)
			}
		}
	})
	return postLater
}

export const handleFilterPosts = () => {
	return (dispatch, selector) => {
		const { posts, search, topic, lang, day } = selector(state => state).blog

		let filteredToPosts = null

		const commonFiltered = (firstMatched, secondMatched) => {
			if (search) {
				return (filteredToPosts = posts
					.filter(p => p[firstMatched].toString() === secondMatched.toString())
					.filter(p => p.title.toLowerCase().includes(search.toLowerCase())))
			} else {
				return (filteredToPosts = posts.filter(p => p[firstMatched].toString() === secondMatched.toString()))
			}
		}

		if (topic && !lang) {
			commonFiltered('group', topic)
		} else if (lang && !topic) {
			commonFiltered('lang', lang)
		} else if (topic && lang) {
			if (search) {
				filteredToPosts = posts
					.filter(p => p.group.toString() === topic.toString())
					.filter(p => p.lang.toString() === lang.toString())
					.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
			} else {
				filteredToPosts = posts.filter(p => p.group.toString() === topic.toString()).filter(p => p.lang.toString() === lang.toString())
			}
		} else {
			if (search) {
				filteredToPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
			} else {
				filteredToPosts = posts
			}
		}
		filteredToPosts = filterByDay(filteredToPosts, day)
		dispatch({
			type: HANDLE_FILTERED_POSTS,
			payload: filteredToPosts,
		})
	}
}

export const handleChangeItemPerPage = event => {
	return dispatch => {
		dispatch({
			type: HANDLE_CHANGE_ITEM_PER_PAGE,
			payload: event.target.value,
		})
	}
}

export const handleChangeFilterDatePosts = day => {
	return dispatch => {
		dispatch({
			type: HANDLE_CHANGE_DATE_POSTS,
			payload: day,
		})
	}
}

export const handleChangeSubscriberMail = event => {
	event.persist()
	return dispatch => {
		dispatch({
			type: HANDLE_CHANGE_SUBSCRIBER_MAIL,
			payload: event.target.value,
		})
	}
}

export const handleSubmitSubscriberMail = event => {
	event.preventDefault()
	// Sent To Mail Server
	return async (dispatch, selector) => {
		const { subscriberEmail } = selector(state => state).blog

		try {
			const res = await axios.post(
				process.env.REACT_APP_URI_POST_SUBSCRIBE,
				{ email: subscriberEmail },
				{
					headers: {
						'x-api-key': process.env.REACT_APP_API_KEY,
					},
				}
			)
			dispatch({
				type: HANDLE_SUBMIT_SUBSCRIBER_MAIL_SUCCESS,
				payload: res.data.message,
			})
		} catch (e) {
			dispatch({
				type: HANDLE_SUBMIT_SUBSCRIBER_MAIL_FAILED,
				payload: e.response.data.message || e.message,
			})
		}
	}
}

export const handleIncrementAndDecrement = no => {
	return dispatch => {
		dispatch({
			type: HANDLE_INCREMENT_AND_DECREMENT,
			payload: no,
		})
	}
}
