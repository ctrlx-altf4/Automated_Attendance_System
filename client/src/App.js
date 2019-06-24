import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Predict from './component/predict/predict';
import DataCollect from './component/data_collect/data_collect';
import Camera from './component/register/Camera';
//import UserDetails from './component/userDetails/UserDetails'
import NavBar from './component/navBar/navBar';
import Register from './component/register/Register';


function App() {
  return (
    <Router>
      <NavBar/>
    <div className="App">
    
    {/* <NavBar/> */}
    <switch>
        <Route exact path='/' component={Register}/>
        <Route path = '/signup' component={Register}/>
        <Route path = '/register' component={Register}/>
    </switch>
    <div className="App-body">
       {/* <UserDetails></UserDetails> */}
       {/* <DataCollect/>
       <Predict/> */}
    </div>
    
  </div></Router>
   
  );
}

export default App;
