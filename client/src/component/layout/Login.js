import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
    return (
        <ul className="right" >
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/'>Contact</NavLink></li>
        <li><NavLink to='/'>About Us</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
        <li><NavLink to='/'>LogOut</NavLink></li>
        </ul>
    )
}

export default Login