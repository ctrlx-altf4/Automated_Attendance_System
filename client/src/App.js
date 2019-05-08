import React from 'react';
import logo from './logo.svg';
import './App.css';
import Predict from './component/predict/predict';
import DataCollect from './component/data_collect/data_collect';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DataCollect/>
        <Predict/>
      </header>
    </div>
  );
}

export default App;
