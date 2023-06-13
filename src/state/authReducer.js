import {
	SET_LOGIN,
	SET_LOGOUT,
	SET_USER,
	REG_SUCCESS,
	REG_FAILED,
	LOGIN_FAILED,
	RESET_MSG
} from './types';


let isLogged = sessionStorage.getItem("isLogged");
let user = sessionStorage.getItem("user");
let token = sessionStorage.getItem("token");
let expires = sessionStorage.getItem("expires");

const initState = {
	isLogged:isLogged||false,
	user:user||null,
	token:token||null,
	expires:expires||0,
	regSuccess:false,
	msg:''
}

const authReducer = (state=initState,action)=>{
	switch(action.type){
	case SET_LOGIN:
		sessionStorage.setItem("isLogged",true)
		sessionStorage.setItem("user",JSON.stringify(action.payload.user))
		sessionStorage.setItem("token",action.payload.token)
		sessionStorage.setItem("expires",action.payload.expires)
		return{
			...state,
			isLogged:true,
			user:action.payload.user,
			token:action.payload.token,
			expires:action.payload.expires
		}
	case LOGIN_FAILED:
		return{
			...state, 
			isLogged:false,
			msg:action.payload.msg
		}
	case REG_SUCCESS:
		return{
			...state, 
			regSuccess:true,
			msg:action.payload.msg
		}
	case REG_FAILED:
		return{
			...state, 
			regSuccess:false,
			msg:action.payload.msg
		}
	case SET_USER:
		return{
			...state, 
			user:action.payload.user,
		}
	case SET_LOGOUT:
		return{
			...state,
			isLogged:false,
			user:null,
			token:null,
			expires:null
		}
	case RESET_MSG:
		return{
			...state,
			msg:''
		}

	default:
		return state;
	}
}

export default authReducer;