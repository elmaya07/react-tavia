import {Container,Row,Col,Form,Button,Alert,InputGroup } from 'react-bootstrap/';

export default function Grafik(){
	return(
			<Container>
				<Row className="justify-content-md-center hide" >
					<Col lg={4} md={4} sm={6} xs={8}  className="justify-content-md-center" style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
						<div  style={{backgroundColor:'#c5ad96',width:'320px',height:'320px',borderRadius:'50%',position:'absolute'}}></div>
					</Col>
				</Row>
			</Container>
		);
}