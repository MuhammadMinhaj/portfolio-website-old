import { combineReducers } from 'redux'
import webReducer from './web'
import portfolioReducer from './portfolio'
const reducers = combineReducers({
	web: webReducer,
	portfolio: portfolioReducer,
})

export default reducers
