import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Predict from './component/predict/predict';
import DataCollect from './component/data_collect/data_collect';
import Camera from './component/camera/Camera';
import UserDetails from './component/userDetails/UserDetails'
import NavBar from './component/navBar/navBar';


function App() {
  return (
    <Router>
    <div className="App">
    <header className="App-header">
      <NavBar></NavBar>
      <UserDetails></UserDetails>
      <Camera/>
      <DataCollect/>
      <Predict/>
    </header>
  </div></Router>
   
  );
}

export default App;
