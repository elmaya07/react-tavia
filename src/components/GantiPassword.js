import {useState} from 'react';
import {Container,Row,Col,Form,Button,Alert,InputGroup } from 'react-bootstrap/';
import Header from './Header';
import Garfik from './Garfik';
import {Link,useParams,Navigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {gPassword,setReset} from '../state/actions';
import axios from 'axios';

export default function GantiPassword(){

	const params = useParams();

	const [password,setPassword] = useState('');
	const [password1,setPassword1] = useState('');

	const [inputType,setInputType] = useState('password');
	const [labelType,setLabelType] = useState('show');
	const [inputTypeLogin,setInputTypeLogin] = useState('password');
	const [labelTypeLogin,setLabelTypeLogin] = useState('show');


	const [email,setEmail] = useState('');
	const [loginRef,setLoginRef] = useState(false);

	const state = useSelector(state=>state.authReducer);
	const dispatch = useDispatch();

	let p = new Promise((resolve, reject) => {
    setTimeout(() => {        	
            resolve()        
            reject()
        
    }, 2000)
})

	const showHide = ()=>{
		if(inputType=='password'){
			setInputType('text')
			setLabelType('Hide')
		}else{
			setInputType('password')
			setLabelType('Show')
		}
	}

	const showHideLogin = ()=>{
		if(inputTypeLogin=='password'){
			setInputTypeLogin('text')
			setLabelTypeLogin('Hide')
		}else{
			setInputTypeLogin('password')
			setLabelTypeLogin('Show')
		}
	}

	const [isOk,setIsOk]  =useState(false);
	const gantiPassword = ()=>{

		if(password!=password1){
			setIsOk(true)
			return false;
		}

		if(String(password).length < 6 || password=='' || password1 =='') return false;

		const d = {
			password:password,
			id:params.id
		}
		 dispatch(gPassword(d))			
	}
	if(state.status==0){		

	return(
			<>
			<Garfik/>
			<Header/>
			<div style={{height:'90px'}}></div>			
			
		 	<Container fluid className="mt-4">
		 	 	<Row className="d-flex justify-content-center mt-4">		 	 		
		 		 	<Col lg={4}>
		 		 	{isOk && (<Alert variant="danger">Password tidak sama</Alert>)}
		 		 	{state.msg !== "" && (<Alert variant={state.status==200? 'success' : 'danger'}>{state.msg }</Alert>)}

		 		 	<center><p style={{color:'#c6af96'}}>Masukan kata sandi baru</p></center>
		 		 	<br/>
		 		 		  <Form>
					      
					       <InputGroup className="mb-3">
					        <Form.Control
					        	type={inputTypeLogin}
					        	 onChange={(e)=>setPassword(e.target.value)} 
					          placeholder="Password"
					          aria-label="Password"
					          aria-describedby="basic-addon2"
					        />
					        <InputGroup.Text id="basic-addon2">
					        <a onClick={showHideLogin}>{labelTypeLogin}</a>
					        </InputGroup.Text>
					      </InputGroup>

					         <InputGroup className="mb-3">
					        <Form.Control
					        	type={inputType}
					        	 onChange={(e)=>setPassword1(e.target.value)} 
					          placeholder="Input Kembali Password"
					          aria-label="Password"
					          aria-describedby="basic-addon2"
					        />
					        <InputGroup.Text id="basic-addon2">
					        <a onClick={showHide}>{labelType}</a>
					        </InputGroup.Text>
					      </InputGroup>


					     <Row>
					     	<Col className="d-flex justify-content-center mt-4">
					     		
					     		<Button variant="primary" disabled={loginRef} onClick={gantiPassword}  className="btn">Submit</Button>						     	 	
					     	</Col>					     	 
					     </Row>
					    </Form>

		 		 	</Col>
		 		</Row>
		 	</Container>
		</>

		);
	}else{
		return <Navigate to="/" replace={true} />
	}
}