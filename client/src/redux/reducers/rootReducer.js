import { combineReducers } from 'redux'
import {alertReducer} from './alertReducer.js'
import { authReducer } from './authReducer.js'
import { profileReducer } from './profileReducer.js'



const rootReducer = combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    profile: profileReducer,
})



export default rootReducer