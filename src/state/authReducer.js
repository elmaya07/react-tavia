import {
	SET_LOGIN,
	SET_LOGOUT,
	SET_USER,
	REG_SUCCESS,
	REG_FAILED,
	LOGIN_FAILED,
	RESET_MSG,
	REQ_GANTI_PASSWORD_SUCCESS,
	REQ_GANTI_PASSWORD_FAILED
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
	status:0,
	msg:'',
	loading:false,
}

const authReducer = (state=initState,action)=>{
	switch(action.type){
	case 'LOGIN_START':
		return{
			...state,
			loading:true,
		}
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
			expires:action.payload.expires,
			loading:false,
		}
	case LOGIN_FAILED:
		return{
			...state, 
			isLogged:false,
			msg:action.payload.msg,
			loading:false,
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
		sessionStorage.setItem("isLogged",false)
		sessionStorage.setItem("user",null)
		sessionStorage.setItem("token",null)
		sessionStorage.setItem("expires",null)
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
	case REQ_GANTI_PASSWORD_SUCCESS:
		return{
			...state,
			status:200,
			msg:action.payload.msg
		}
	case REQ_GANTI_PASSWORD_FAILED:
		return{
			...state,
			status:401,
			msg:action.payload.msg
		}
	case 'GANTI_PASSWORD_OK':
		return{
			...state,
			status:200, 
		}
	case 'GANTI_PASSWORD_FAILED':
		return{
			...state,
			status:401, 
		}
	default:
		return state;
	}
}

export default authReducer;