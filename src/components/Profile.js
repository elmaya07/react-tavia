import {useEffect,useState} from 'react';
import {Container,Row,Col,Form,Button } from 'react-bootstrap/';
import Header from './Header'
import {connect} from 'react-redux';
import Garfik from './Garfik';
import {getUser,setLogout} from '../state/actions'

function Profile(props){  

	const setLogout = ()=>{
		props.logout(props.dataLogin.token)
	}

	useEffect(()=>{
		props.getData(props.dataLogin.token);			
	},[])
	return (
		<>
			<Garfik/>
			<Header/>
			<div style={{height:'90px'}}></div>
			 	
		 	<Container fluid className="mt-4">
		 		<Row className=" d-flex justify-content-center mt-4">		 				 			 
		 			<Col xs={5} sm={5} md={5} lg={5} className=" d-flex justify-content-center">
		 				 <div style={{border:'5px solid grey',width:'120px',height:'120px',borderRadius:'50%',overflow:'hidden'}}>
		 				<img src={props.user!==null && props.user.foto} style={{width:'100%',height:'100%'}} />
		 				</div>		 			
		 			</Col>		 			
		 		</Row>
		 		<Row>
		 			<Col>
		 				<div className="mt-4">
		 					<center><h3 style={{color:'grey'}}>{props.user!==null && String(props.user.nama).toUpperCase()}</h3></center>
		 				</div>		 				 
		 			</Col>
		 		</Row>	
		 		<Row className="justify-content-md-center">
		 			<Col xs={12} sm={12} md={8} lg={6}>
		 				{ props.user!==null && (
		 					<Form>					    	
							      <Row className="mt-4">
								      	<Col lg={6}>
								      	 <Form.Label>Alamat Email</Form.Label>
								      	 <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
								        	<Form.Control type="email" value={props.user!==null && props.user.email} placeholder="Alamat Email" />
								      	 </Form.Group>
								      </Col>
								      <Col lg={6}>
								       <Form.Label>Nomor Telepon</Form.Label>
								      	 <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
								        	<Form.Control type="text" value={props.user!==null && props.user.no_telp}  placeholder="Nomor Telepon" />
								      	 </Form.Group>
								      </Col>
							      </Row>					   					   
							    </Form>
							    
		 					) }
		 			</Col>
		 			<div style={{marginTop:'40px'}}></div>
		 			<center>
		 				 <a onClick={setLogout} style={{fontWeight:'bold',color:'grey'}}>SIGN OUT</a>
		 			</center>
		 		 
		 		</Row>
		 	</Container>
		</>
		)
}

const mapStateToProps = state=>{
	return{
		user:state.authReducer.user,
		dataLogin:state.authReducer
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		getData:(token)=>dispatch(getUser(token)),
		logout:(token)=>dispatch(setLogout(token)),
		setReset:()=>dispatch({type:'RESET_MSG'})
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);