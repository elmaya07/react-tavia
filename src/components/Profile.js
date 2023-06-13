import {useEffect,useState} from 'react';
import {Container,Row,Col,Form,Button } from 'react-bootstrap/';
import Header from './Header'
import {connect} from 'react-redux';
import {getUser,setLogout} from '../state/actions'

function Profile(props){  

	const setLogout = ()=>{
		props.logout(props.dataLogin.token)
	}

	useEffect(()=>{
		props.getData(props.dataLogin.token);	
		console.log(props.user)
	},[])
	return (
		<>
			<Header/>
			<br/>
		 		<br/>	
		 	<Container fluid>
		 		<Row className="justify-content-md-center">		 		
		 			 
		 			<Col xs={2} sm={2} md={2} lg={2}>
		 				<center><div style={{border:'2px solid grey',width:'120px',height:'120px',borderRadius:'50%',overflow:'hidden'}}>
		 				<img src="https://placehold.co/600x600" style={{width:'100%',height:'100%'}} />
		 				</div>
		 				<div className="mt-4">
		 					<h3 style={{color:'grey'}}>{props.user!==null && props.user.nama}</h3>
		 				</div>
		 				</center>
		 			</Col>
		 		</Row>
		 		<Row className="justify-content-md-center">
		 			<Col xs={12} sm={12} md={10} lg={8}>
		 				{ props.user!==null && (
		 					<Form>					    	
							      <Row className="mt-4">
								      	<Col lg={6}>
								      	 <Form.Label>Alamat Email</Form.Label>
								      	 <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
								        	<Form.Control type="email" value={props.user.email} placeholder="Alamat Email" />
								      	 </Form.Group>
								      </Col>
								      <Col lg={6}>
								       <Form.Label>Nomor Telepon</Form.Label>
								      	 <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
								        	<Form.Control type="text" value={props.user.no_telp}  placeholder="Nomor Telepon" />
								      	 </Form.Group>
								      </Col>
							      </Row>					   					   
							    </Form>
							    
		 					) }
		 			</Col>
		 			<br/><br/>
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
		user:state.user,
		dataLogin:state
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		getData:(token)=>dispatch(getUser(token)),
		logout:(token)=>dispatch(setLogout(token))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);