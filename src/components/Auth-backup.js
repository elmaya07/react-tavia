import {useState,useEffect} from 'react';
import {logiProccess} from '../state/actions'
import Header from './Header'
import {Navigate} from 'react-router-dom';

import {connect} from 'react-redux';

 function Auth(props){
	const [email,setEmail] = useState('eliskadamayanti24@admin.com');
	const [password,setPassword] = useState('password');

	const setLogin = ()=>{
			let data = {
				email:email,
				password:password
			}

			props.setLogin(data)
	}		
			 if(props.dataLogin.isLogged==true){
			 	return <Navigate to="/profile" replace={true} />
			 }else{
			 	return(
			 		<>

				<Header/>
			<div className="Auth">				

				<div className="Login" style={{height:'100%'}}>
					<div>
					<h3 style={{color:'#c6af96',fontWeight:'bold'}}>Sign In</h3>
					<div style={{width:'80%'}}>
					<p style={{color:'#c6af96'}}>Masuk dan buat undaangan pernikahanmu, kemudian share undangan kamu</p>
					</div>
					<div className="formGroup">
						<input type="email" className="Txt" onChange={(e)=>setEmail(e.target.value)} placeholder="Alamat Email" />
					</div>
					<div className="formGroup">
						<input type="password" className="Txt"  onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
					</div>

					<div className="formGroup" style={{width:'53%'}}>
						<a style={{fontWeight:'bold',color:'#c6af96'}}>Lupa Password</a>
						<button onClick={setLogin} className="btn">Sign In</button>
					</div>

					</div>
				</div>


				<div className="Reg"  style={{height:'100%'}}>
				<div>
					<h3  style={{color:'#c6af96',fontWeight:'bold'}}>Daftar</h3>
					<div style={{width:'80%'}}>
					<p style={{color:'#c6af96'}}>Buat undangan pernikahan digital kamu dengan elegan</p>
					</div>
					<div className="formGroup">
						<input type="email" className="Txt" placeholder="Alamat Email" />
					</div>
					<div className="formGroup">
						<input type="text" className="Txt" placeholder="Nomor Hp" />
					</div>
					<div className="formGroup">
						<input type="text" className="Txt" placeholder="Nama Panggilan Laki-laki" />
					</div>
					<div className="formGroup">
						<input type="text" className="Txt" placeholder="Nama Panggilan Perempuan" />
					</div>
					<div className="formGroup">
						<input type="password" className="Txt" placeholder="Password" />
					</div>

					<div className="formGroup" style={{width:'85%'}}>
						 
						<button className="btn">Buat Undanganmu Sekarang</button>
					</div>

					</div>
				</div>
			</div>
				</>);

			 }
}

const mapStateToProps= state=>{
	return{
		dataLogin:state
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		setLogin:(data)=>dispatch(logiProccess(data))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)