import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'
import './NavBar.css'


const NavBar = () => {
    return (
    //     <nav className="nav-wrapper grey darken-4">
    //     <div className="container">
    //     <Link to='/' className="brand-logo">Recognize Face</Link>      
    //    <Login/>
    //    <Logout/>
    //     </div>
    //     </nav>
    <div>
        
        <nav class>
       
            <ul>
                <li class="logo">LOGO</li>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/'>Contact</NavLink></li>
                <li><NavLink to='/'>About Us</NavLink></li>
                <li><NavLink to='/register'>Register</NavLink></li>
                <li><NavLink to='/attendance'>Attendance</NavLink></li>
            </ul>
        </nav>
    </div>
    
    )
}

export default NavBar