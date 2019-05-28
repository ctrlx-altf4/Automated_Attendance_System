import React from 'react';
import logo from './logo.svg';
import './App.css';
import Predict from './component/predict/predict';
import DataCollect from './component/data_collect/data_collect';
import Camera from './component/camera/Camera';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Camera/>
        <DataCollect/>
        <Predict/>
      </header>
    </div>
  );
}

export default App;
