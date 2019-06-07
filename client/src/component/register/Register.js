import React, { Component } from 'react';
import './Register.css'
import Camera from '../auth/Camera';
 
class Register extends Component {
    render(){
        return(
        <div className="container">
        <div  className="row">
        <div className="col s12 m6"> 
              <Camera/>
          </div>
        <div className="col s12 m5 offset-m1">
        <div className="box-container">
            <div className="inner-container">
            <div className="header">
            <div className="white-text" >
              Register Here
            </div></div>
            <div className="box">
    
              <div className="input-group">
              <input className="login-input" type="text" name="username"  placeholder="Username"/>
              </div>
    
              <div className="input-group">
              <input type="text" name="dob" className="login-input" placeholder="DateOfBirth"/>
              </div>

              <div className="input-group">
              <input className="login-input" type="text" name="Email"  placeholder="Email"/>
              </div>
    
              <button type="button" className="login-btn"><div className="white-text">Login</div></button>
              </div>
              </div>  </div>  
              </div>
              </div>
              </div>
   
        )
    }
}
export default Register