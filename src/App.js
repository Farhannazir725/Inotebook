
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import NavBar  from '../src/components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NotState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

  // import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (massage, type)=>{
    setAlert({
      msg: massage,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
}
  return (
   
    <NoteState>
    <BrowserRouter>
    <NavBar/>
    <Alert alert={alert}/>
     <div className="container ">
    <Routes>
      <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
      <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
   
  );
}

export default App;
