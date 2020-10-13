import { combineReducers } from 'redux'
import appReducer from './app'
import subscriptionsReducer from './subscriptions'
import blogReducer from './blog'
import portfolioReducer from './portfolio'
export default combineReducers({
	app: appReducer,
	subscriptions: subscriptionsReducer,
	blog: blogReducer,
	portfolio: portfolioReducer,
})
