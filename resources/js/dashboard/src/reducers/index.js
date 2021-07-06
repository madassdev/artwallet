import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import ItemReducer from './itemReducer';
import serviceReducer from './serviceReducer';
import providerReducer from './providerReducer';
import AppReducer from './appReducer';
import planReducer from './planReducer';

const rootReducer = combineReducers({
    userState: UserReducer,
    serviceState: serviceReducer,
    providerState: providerReducer,
    planState: planReducer,
    appState: AppReducer, 
})

export default rootReducer