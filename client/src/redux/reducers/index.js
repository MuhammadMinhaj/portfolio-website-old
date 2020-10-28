import { combineReducers } from 'redux'
import webReducer from './web'
import portfolioReducer from './portfolio'
import blogReducer from './blog'
const reducers = combineReducers({
	web: webReducer,
	portfolio: portfolioReducer,
	blog: blogReducer,
})

export default reducers
