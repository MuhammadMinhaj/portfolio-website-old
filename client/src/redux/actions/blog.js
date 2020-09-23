import {
	BLOG_HANDLE_DRAWER,
	BLOG_HANDLE_DRAWER_MOBILE,
	BLOG_HANDLE_COLLAPSE,
	BLOG_HANDLE_SELECTED_POST,
	BLOG_HANDLE_MATCHED_URL_PARAMS,
	BLOG_HANDLE_SEARCH,
	BLOG_HANDLE_CLEAR_SEARCH,
} from '../constants/type'

export const handleDrawer = () => {
	return dispatch => {
		dispatch({
			type: BLOG_HANDLE_DRAWER,
		})
	}
}

export const handleDrawerMobile = value => {
	return dispatch => {
		dispatch({
			type: BLOG_HANDLE_DRAWER_MOBILE,
			payload: value,
		})
	}
}

export const handleCollapse = index => {
	return dispatch => {
		dispatch({
			type: BLOG_HANDLE_COLLAPSE,
			payload: index,
		})
	}
}

// Handle Selected Post To Get Index For Showing Circle With List
export const handleSelectedPost = index => {
	return dispatch => {
		dispatch({
			type: BLOG_HANDLE_SELECTED_POST,
			payload: index,
		})
	}
}

// Showing Content Form URL Parameters
export const handleSearchQuery = (groupid, postid) => {
	return (dispatch, selector) => {
		const { contents } = selector(state => state).blog

		let hasPost
		let collapseIndex
		let selectedPost

		contents.forEach((group, indexOne) => {
			if (group.title.toLowerCase() === groupid.toLowerCase()) {
				collapseIndex = indexOne

				group.posts.forEach((post, indexTow) => {
					if (post.title.toLowerCase() === postid.toLowerCase()) {
						selectedPost = indexTow
						hasPost = post
						return false
					}
				})

				return false
			}
		})
		if (hasPost) {
			dispatch({
				type: BLOG_HANDLE_MATCHED_URL_PARAMS,
				payload: {
					post: hasPost,
					collapseIndex,
					selectedPost,
				},
			})
		} else {
			dispatch({
				type: BLOG_HANDLE_MATCHED_URL_PARAMS,
				payload: {
					post: null,
					collapseIndex: 0,
					selectedPost: null,
				},
			})
		}
	}
}

// Searching Blogs
export const handleSearch = query => {
	return dispatch => {
		dispatch({
			type: BLOG_HANDLE_SEARCH,
			payload: query,
		})
	}
}

// Clear Search For Updated State To Load New Page
export const handleClearSearch = () => {
	return dispatch => {
		dispatch({
			type: BLOG_HANDLE_CLEAR_SEARCH,
		})
	}
}
