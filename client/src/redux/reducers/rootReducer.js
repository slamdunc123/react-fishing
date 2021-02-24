import { combineReducers } from 'redux';
import fishReducer from './fishReducer';
import reminderReducer from './reminderReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

export default combineReducers({
	fishReducer: fishReducer,
	reminderReducer: reminderReducer,
	authReducer: authReducer,
	alertReducer: alertReducer,
});
