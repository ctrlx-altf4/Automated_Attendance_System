import React from 'react';
import logo from './logo.svg';
import './App.css';
import Predict from './component/predict/predict';
import DataCollect from './component/data_collect/data_collect';
import Camera from './component/camera/Camera';
import UserDetails from './component/userDetails/UserDetails'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserDetails></UserDetails>
        <Camera/>
        <DataCollect/>
        <Predict/>
      </header>
    </div>
  );
}

export default App;
