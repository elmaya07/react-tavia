import {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/Header.css';
import './assets/Auth.css';
import Header from './components/Header';
import Auth from './components/Auth';
import Profile from './components/Profile';
import {BrowserRouter,Routes,Route,Link,useNavigate} from 'react-router-dom';
import {ProtectedRoute} from './utility/ProtectedRoute'
import {useSelector,useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';

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

export default App;
