import { combineReducers } from 'redux'
import {alertReducer} from './alertReducer.js'
import { authReducer } from './authReducer.js'
import { profileReducer } from './profileReducer.js'
import { postReducer } from './postReducer.js'



const rootReducer = combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer
})



export default rootReducer