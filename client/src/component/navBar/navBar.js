import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'


class NavBar extends Component{
    // constructor(){     
    // }
    render(){
        
        return(
         
            <div>
                <nav class="navigation-menu">
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/'>Contact</NavLink></li>
                        <li><NavLink to='/'>About Us</NavLink></li>
                        <li><NavLink to='/register'>Register</NavLink></li>
                        <li><NavLink to='/'>LogOut</NavLink></li>
                    </ul>
                </nav> 
            </div>
           
         );
    }
    
}

export default NavBar;