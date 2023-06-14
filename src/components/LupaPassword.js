import {useState} from 'react';
import {Container,Row,Col,Form,Button,Alert,InputGroup } from 'react-bootstrap/';
import Header from './Header';
import Garfik from './Garfik';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {gantiPasswordActions,setReset} from '../state/actions'

export default function LupaPassword(){

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


	const gantiPassword = ()=>{
		if(email=='') return false;
		setLoginRef(true)
		dispatch(gantiPasswordActions(email));
		setTimeout(()=>{
			dispatch({type:'RESET_MSG'})			
		},3000)
		setEmail('');
		p.then((result) => {
		    setLoginRef(false)
		}).catch((error) => {
		    setLoginRef(false)
		})

	}

	return(
			<>
			<Garfik/>
			<Header/>
			<div style={{height:'90px'}}></div>			
			
		 	<Container fluid className="mt-4">
		 	 	<Row className="d-flex justify-content-center mt-4">		 	 		
		 		 	<Col lg={4}>

		 		 	{state.msg !== "" && (<Alert variant={state.status==200? 'success' : 'danger'}>{state.msg }</Alert>)}

		 		 	<center><p style={{color:'#c6af96'}}>Masukan email untuk mengganti password baru, pastikan email sudah terdaftar di database</p></center>
		 		 	<br/>
		 		 		  <Form>
					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
					        <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Alamat Email" />
					      </Form.Group>					   

					     <Row>
					     	<Col className="d-flex justify-content-center mt-4">
					     		<Button variant="primary"  className="btn"><Link style={{textDecoration:'none',color:'white'}} to="/">Kembali</Link></Button>&nbsp;&nbsp;
					     		{loginRef}
					     		<Button variant="primary" disabled={loginRef} onClick={gantiPassword}  className="btn">Submit</Button>						     	 	
					     	</Col>					     	 
					     </Row>
					    </Form>

		 		 	</Col>
		 		</Row>
		 	</Container>
		</>

		);
}