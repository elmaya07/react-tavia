import authReducer from './authReducer';
import {combineReducers} from 'redux';


const allRedicer = combineReducers({
	authReducer
});

export default allRedicer;
