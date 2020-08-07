// root reducer for combine all reducers in app
import { combineReducers } from 'redux'
import auth from './auth'
export default combineReducers({
    auth
});