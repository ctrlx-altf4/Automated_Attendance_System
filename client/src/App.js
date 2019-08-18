import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Predict from './component/predict/predict';
import DataCollect from './component/data_collect/data_collect';

import Register from './component/register/Register';

import Attendance from './component/attendance-sheet/attendance';


function App() {
  return (
    <Router>
      
      {/* <NavBar/> */}
    <div className="App">
    {/* <div className="bg-modal">
          <div className="modal-content">
            <div className="close">+</div>
            <img src="modal-icon.jpg" width="200px" height="200px" alt=" "></img>
              <DataCollect/>
              <Predict/> 
          </div>
      </div> */}
    
        <Route exact path='/' component={Register}/>
        <Route path = '/signup' component={Register}/>
        <Route path = '/register' component={Register}/>
        <Route path = '/attendance' component={Attendance}/>
  
    <div className="App-body">
       {/* <UserDetails></UserDetails> */}
      
    </div>
    
  </div></Router>
   
  );
}

export default App;
