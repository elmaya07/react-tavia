import {Container,Row,Col,Form,Button,Alert } from 'react-bootstrap/';
import Header from './Header'
import {Navigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {logiProccess,regProccess} from '../state/actions'
import {connect} from 'react-redux';


function Auth(props) {

	const [email,setEmail] = useState('eliskadamayanti24@admin.com');
	const [password,setPassword] = useState('password');
	const [noHp,setNoHp] = useState('');
	const [namaLakiLaki,setNamaLakiLaki] = useState('');
	const [namaPerempuan,setNamaPerempuan] = useState('password');

	const setLogin = ()=>{
		let data = {
			email:email,
			password:password
		}
		props.setLogin(data)
	}

	const setRegister = ()=>{
		let data = {
			nama:namaLakiLaki||namaPerempuan,
			email:email,
			password:password,
			nomor_telepon:noHp,
			nama_laki_laki:namaLakiLaki,
			nama_perempuan:namaPerempuan
		}
		props.setRegister(data)
	}

	useEffect(()=>{
		setTimeout(()=>{
				props.setReset()
		},3000)
	},[])


   if(props.dataLogin.isLogged==true){
	 	return <Navigate to="/profile" replace={true} />
	 }else if(props.dataLogin.regSuccess===true){
	 	return <Navigate to="/verif" replace={false} />
	 }else{
	 	return (
  	<>
  	<Header/>
    <Container fluid>    
    	<br/><br/>	

    	<Row  className="justify-content-md-center">
    		<Col lg={7}>
    			{props.dataLogin.msg !== "" && (<Alert variant="danger">{props.dataLogin.msg }</Alert>)}
    		</Col>
    	</Row>
        

      <Row>
        <Col xs={12} lg={6}>


        	
        	<Row className="justify-content-md-center" style={{paddingTop:'30px'}}>
        		<Col lg={8}>
        			<h3  style={{color:'#c6af96',fontWeight:'bold'}}>Sign In</h3>
        			<p style={{color:'#c6af96'}}>Masuk dan buat undangan pernikahan kamu, kemudian share undangan kamu</p>
	        		<Form>
					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput1">		        
					        <Form.Control type="email"  onChange={(e)=>setEmail(e.target.value)} placeholder="Alamat Email" />
					      </Form.Group>

					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput2">					       
					        <Form.Control type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
					      </Form.Group>		
					     <Row>
					     	<Col>
					     		<Button variant="primary" onClick={setLogin} className="btn">Sign In</Button>	
					     	 	
					     	</Col>
					     	<Col className="justify-content-md-around">					     		 
					     		<a  style={{fontWeight:'bold',color:'#c6af96'}}>Lupa Password</a> 					     		 
					     	</Col>
					     </Row>
					    </Form>
				</Col>					   
        	</Row>

        </Col>
        <Col xs={12} lg={6} style={{borderLeft:'2px solid #c6af96'}}>
        <Row className="justify-content-md-center" style={{paddingTop:'30px'}}>
        		<Col lg={8}>        	 
        	
        			<h3  style={{color:'#c6af96',fontWeight:'bold'}}>Daftar</h3>
        			<p style={{color:'#c6af96'}}>Buat undangan pernikahanmu dengan elegan</p>
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

					      <Form.Group className="mb-3 Txt" controlId="exampleForm.ControlInput2">					       
					        <Form.Control type="password"  onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" />
					      </Form.Group>		
					     <Row>
					      
					     	<Col className="justify-content-md-around">					     		 
					     		 	<Button onClick={setRegister} variant="primary" className="btn">Buat Undanganmu Sekarang</Button>					     		 
					     	</Col>
					     </Row>
					    </Form>
				</Col>					   
        	</Row>
        	</Col>
      </Row>
    </Container>
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