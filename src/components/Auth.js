import {Container,Row,Col,Form,Button,Alert,InputGroup } from 'react-bootstrap/';
import Header from './Header';
import Garfik from './Garfik';
import {Navigate} from 'react-router-dom';
import {useState,useEffect,useRef} from 'react';
import {logiProccess,regProccess} from '../state/actions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// auth component
function Auth(props) {

	const [email,setEmail] = useState('eliskadamayanti24@admin.com');
	const [password,setPassword] = useState('password');
	const [noHp,setNoHp] = useState('');
	const [namaLakiLaki,setNamaLakiLaki] = useState('');
	const [namaPerempuan,setNamaPerempuan] = useState('password');
	const [inputType,setInputType] = useState('password');
	const [labelType,setLabelType] = useState('show');
	const [inputTypeLogin,setInputTypeLogin] = useState('password');
	const [labelTypeLogin,setLabelTypeLogin] = useState('show');

	const [loginRef,setLoginRef] = useState(false);
	const [regRef,setRegRef] = useState(false);

	const setLogin = ()=>{
		let data = {
			email:email,
			password:password
		}
		setLoginRef(true)
		props.setLogin(data)
		setTimeout(()=>{
				props.setReset()
		},3000)
		setLoginRef(false)
	}

	const setRegister = ()=>{
		setRegRef(true)
		let data = {
			nama:namaLakiLaki||namaPerempuan,
			email:email,
			password:password,
			nomor_telepon:noHp,
			nama_laki_laki:namaLakiLaki,
			nama_perempuan:namaPerempuan
		}
		props.setRegister(data)
		setTimeout(()=>{
				props.setReset()
		},3000)
		setRegRef(false)
	}

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

	useEffect(()=>{
		// loginRef.current.disabled
	})

   if(props.dataLogin.isLogged===true){
	 	return <Navigate to="/profile" replace={true} />
	 }else if(props.dataLogin.regSuccess===true){
	 	return <Navigate to="/verif"  />
	 }else{
	 	return (
  	<>
  	<Garfik />
  	<Header />
  	
    <Container fluid className="mtop">    
    	<br/><br/>	

    	<Row  className="justify-content-md-center mt-4">
    		<Col lg={7}>
    			{props.dataLogin.msg !== "" && (<Alert variant="danger">{props.dataLogin.msg }</Alert>)}
    		</Col>
    	</Row>
        

      <Row>
        <Col xs={12} lg={6}>        	
        	<Row className="justify-content-md-center">
        		<Col lg={8}>
        			<h3  style={{color:'#c6af96',fontWeight:'bold'}}>Sign In</h3>
        			<p style={{color:'#c6af96'}}>Masuk dan buat undangan pernikahan kamu, kemudian share undangan kamu</p>
	        		<Form>
					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
					        <Form.Control type="email"  onChange={(e)=>setEmail(e.target.value)} placeholder="Alamat Email" />
					      </Form.Group>

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
					     <Row>
					     	<Col>
					     		<Button variant="primary" disabled={loginRef}  onClick={setLogin} className="btn">Sign In</Button>						     	 	
					     	</Col>
					     	<Col className="justify-content-md-end">					     		 
					     		<span  style={{fontWeight:'bold',color:'#c6af96',display:'inline-block',float:'right'}}> <Link style={{color:'#c6af96'}} to="/lupa-password">Lupa Password</Link> </span> 					     		 
					     	</Col>
					     </Row>
					    </Form>
				</Col>					   
        	</Row>
        </Col>
        <Col xs={12} lg={6} style={{borderLeft:'2px solid #c6af96'}}>
        <Row className="justify-content-md-center"  >
        		<Col lg={8} >        	 
        	
        			<Col lg={12} className="d-flex justify-content-end" ><h3  style={{color:'#c6af96',fontWeight:'bold'}}>Sign Up</h3></Col>
        			<Col lg={12} className="d-flex justify-content-end" style={{color:'#c6af96'}}>Buat undangan pernikahanmu dengan elegan</Col>
        			<Col lg={12} className="d-flex justify-content-end mb-4" > <b>Your altenative wedding inivtation </b> </Col>        			
	        		<Form>					 	
					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
					        <Form.Control type="email"  onChange={(e)=>setEmail(e.target.value)}  placeholder="Alamat Email" />
					      </Form.Group>
					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
					        <Form.Control type="text"  onChange={(e)=>setNoHp(e.target.value)}  placeholder="Nomor HP" />
					      </Form.Group>
					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
					        <Form.Control type="text"  onChange={(e)=>setNamaLakiLaki(e.target.value)}  placeholder="Nama Panggilan Laki-laki" />
					      </Form.Group>
					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
					        <Form.Control type="text"  onChange={(e)=>setNamaPerempuan(e.target.value)}  placeholder="Nama Panggilan Perempuan" />
					      </Form.Group>
					      <InputGroup className="mb-3">
					        <Form.Control
					        	type={inputType}
					        	 onChange={(e)=>setPassword(e.target.value)} 
					          placeholder="Password"
					          aria-label="Password"
					          aria-describedby="basic-addon2"
					        />
					        <InputGroup.Text id="basic-addon2">
					        <a onClick={showHide}>{labelType}</a>
					        </InputGroup.Text>
					      </InputGroup>
					     <Row>
					      
					     	<Col className="justify-content-md-around">					     		 
					     		 	<Button onClick={setRegister} disabled={regRef} variant="primary" className="btn">Buat Undanganmu Sekarang</Button>					     		 
					     	</Col>
					     </Row>
					    </Form>
				</Col>					   
        	</Row>
        	</Col>
      </Row>
    </Container>
    <div style={{height:'100px'}}></div>
    </>
  )
	}
}


const mapStateToProps= state=>{
	return{
		dataLogin:state
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		setLogin:(data)=>dispatch(logiProccess(data)),
		setRegister:(data)=>dispatch(regProccess(data)),
		setReset:()=>dispatch({type:'RESET_MSG'})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)