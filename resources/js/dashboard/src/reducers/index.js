import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import ItemReducer from './itemReducer';
import serviceReducer from './serviceReducer';
import providerReducer from './providerReducer';
import AppReducer from './appReducer';
import planReducer from './planReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
    userState: UserReducer,
    transactionState: transactionReducer,
    serviceState: serviceReducer,
    providerState: providerReducer,
    planState: planReducer,
    appState: AppReducer, 
})

export default rootReducer