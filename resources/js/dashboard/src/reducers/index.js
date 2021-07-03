import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import ItemReducer from './itemReducer';
import serviceReducer from './serviceReducer';
import providerReducer from './providerReducer';
import AppReducer from './appReducer';

const rootReducer = combineReducers({
    userState: UserReducer,
    serviceState: serviceReducer,
    providerState: providerReducer,
    appState: AppReducer, 
})

export default rootReducer