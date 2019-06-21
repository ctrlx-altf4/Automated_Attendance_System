import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './navBar.css'

class NavBar extends Component{
    // constructor(){     
    // }
    render(){
        
        return(
         
            <div className="navigation-menu">
                    <ul>
                        
                        <li><NavLink to ='/'>Logo</NavLink></li> 
                        {/* <li id="navbar-right"><NavLink to='/'>Home</NavLink></li>
                        <li id="navbar-right"><NavLink to='/'>Contact</NavLink></li>
                        <li id="navbar-right"><NavLink to='/'>About Us</NavLink></li>
                        <li id="navbar-right"><NavLink to='/register'>Register</NavLink></li>
                        <li id="navbar-right"><NavLink to='/'>LogOut</NavLink></li> */}
                        
                    </ul>
                
            </div>
           
         );
    }
    
}

export default NavBar;