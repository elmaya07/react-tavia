import {useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/Header.css';
import './assets/Auth.css';
import Header from './components/Header';
import Auth from './components/Auth';
import GantiPassword from './components/GantiPassword';
import LupaPassword from './components/LupaPassword';
import Profile from './components/Profile';
import {BrowserRouter,Routes,Route,Link,useNavigate,useParams} from 'react-router-dom';
import {ProtectedRoute} from './utility/ProtectedRoute'
import {useSelector,useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  const state = useSelector(state=>state);

   const timeout = () => {
      setTimeout(()=> {
          console.log("Token telah berakhir")
          dispatch({
              type: 'SET_LOGOUT'
          })

      }, state.expires)
  }


  useEffect(()=>{
    timeout()
    console.log(state)
  },[])

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/verif" element={<Verif/>} />
        <Route path="/lupa-password" element={<LupaPassword/>} />
        <Route path="/ganti-password/:id/:url" element={<GantiPassword/>} />        
        <Route path="/verif-success/:id/:url" element={<VerifSuccess/>} />        
        <Route path="/profile" element={
          <ProtectedRoute isLogged={state.isLogged}>
              <Profile />
            </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

function Verif(){
   const navigate = useNavigate();
  const state = useSelector(state=>state);
  return (
    <div style={{width:'100%',height:'500px',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <center>
      <div style={{width:'40%'}}>
        <h3 style={{color:'grey'}}>{state.msg}</h3>
      </div>
      
    </center>
    </div>
    )
}

function VerifSuccess(){

  const params = useParams();

  const [vsuccess,setVsuccess] = useState(false);
  const req = ()=>{
    axios.get('http://shop.simpus-web.my.id/public/account-activation-process/'+params.id+'/'+params.url)
    .then(res=>{
      setVsuccess(true)
    }).catch(err=>{
      console.log(err)
      setVsuccess(false)
    })
  }

  const navigate = useNavigate();
  const state = useSelector(state=>state);
    
  useEffect(()=>{
    req();
  },[])  

  return (
    <div style={{width:'100%',height:'500px',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <center>
      <div style={{width:'40%'}}>
        <h3 style={{color:'grey'}}>{!vsuccess ? 'Verifikasi gagal' : 'Verifikasi Sukses'}</h3>
      </div>
      
    </center>
    </div>
    )
}

export default App;
