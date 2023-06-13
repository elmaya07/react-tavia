import {
	SET_LOGIN,
	SET_LOGOUT,
	SET_USER,
	REG_SUCCESS,
	REG_FAILED,
	LOGIN_FAILED
} from './types';


import axios from 'axios';

const url = 'http://shop.simpus-web.my.id/public/';
export const logiProccess = (data)=>{

	return dispatch=>{
		axios({
	      method: "post",
	      url: url+'api/login',
	      data: new URLSearchParams({
	        email: data.email,
	        password: data.password
	      }),
	      headers: { "Content-Type": "application/x-www-form-urlencoded" },
	    })
	      .then(function (response) {
	        //handle success
	        console.log(response);
	        if (response.status==200) {
	        	if(response.data.code==200){
	        			let d ={
			        		user:response.data.user,
			        		token:response.data.access_token,
			        		expires:response.data.expires_in

			        	};
			        	dispatch(setLogin(d));	
	        	}else{
	        		dispatch({type:LOGIN_FAILED,payload:{
	        			msg:`${response.data.message}, ${response.data.urlActivation} `
	        		}})
	        	}       
	        }        
	      })
	      .catch(function (response) {
	        //handle error
	        console.log(response);
	      });
	}
}

export const getUser = (token)=>{	
	return dispatch =>{
		axios.get(url+'api/profile',{
			 headers: { "Authorization": "bearer "+token }
		}).then(res=>{
			console.log(res.data)
			dispatch(setUser(res.data.data))
		}).catch(err=>{
			console.log(err)
		})
	}
}


export const setLogout = (token)=>{
	
	return dispatch =>{
		axios({
	      method: "post",
	      url: url+'api/logout',
	      headers: { "Authorization": "bearer "+token }
	    }).then(res=>{
			console.log(res.data)
			dispatch(setLogoutActions())
		}).catch(err=>{
			console.log(err)
		})
	}
}

export const regProccess = (data)=>{
	return dispatch=>{
		axios({
	      method: "post",
	      url: url+'api/register',
	      data: new URLSearchParams({
		        nama:data.nama,
				email:data.email,
				password:data.password,
				nomor_telepon:data.nomor_telepon,
				nama_laki_laki:data.nama_laki_laki,
				nama_perempuan:data.nama_perempuan
	      }),
	      headers: { "Content-Type": "application/x-www-form-urlencoded" },
	    })
	      .then(function (response) {
	        //handle success
	        console.log(response);
	        if (response.status==200) {
	        	if(response.data.code==200){
	        		dispatch({type:REG_SUCCESS,payload:{
	        			msg:response.data.message,
	        		}})	        		
	        	}else{
	        		dispatch({type:REG_FAILED,payload:{
	        			msg:response.data.message
	        		}})
	        	} 
	        }else{
	        	dispatch({type:REG_FAILED,payload:{
        			msg:response.data.message
        		}})
	        }        
	      })
	      .catch(function (response) {
	        //handle error
	        console.log(response.response);
	        dispatch({type:REG_FAILED,payload:{
        			msg:JSON.stringify(response.response.data)
        		}})
	      });
	}
}


const setLogin = (data)=>{
	return{
		type:SET_LOGIN,
		payload:data
	}
}

const setUser = (data)=>{
	return{
		type:SET_USER,
		payload:{
			user:data
		}
	}
}

const setLogoutActions = ()=>{
	return{
		type:SET_LOGOUT,		
	}
}