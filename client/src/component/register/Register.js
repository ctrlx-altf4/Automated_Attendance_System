import React, {Component} from 'react'
import Camera from './Camera';
import UserDetails from './UserDetails';
import './register.css'

class Register extends Component{
    state ={

    }
   
    render(){
        return(
            <div className="column">
                <Camera/>
                <UserDetails/>
            </div>
            
        );
      
    }
}

export default Register;
