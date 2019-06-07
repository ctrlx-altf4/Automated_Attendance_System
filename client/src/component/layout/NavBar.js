import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Logout from './Logout'

const NavBar = () => {
    return (
        <nav className="nav-wrapper grey darken-4">
        <div className="container">
        <Link to='/' className="brand-logo">Recognize Face</Link>      
       <Login/>
       <Logout/>
        </div>
        </nav>
    )
}

export default NavBar