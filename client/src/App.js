import React from 'react';
import Predict from './component/predict/predict';
import DataCollect from './component/data_collect/data_collect';
import UserDetails from './component/userDetails/UserDetails'
import{BrowserRouter, Switch, Route} from 'react-router-dom'
import NavBar from './component/layout/NavBar'
import Dashboard from './component/dashboard/Dashboard'
import Signup from './component/auth/Signup'
import Register from './component/register/Register'


function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path = '/signup' component={Signup}/>
        <Route path = '/register' component={Register}/>
        </Switch>
       </div>
    </BrowserRouter>
   
  );
}

export default App;


