import React from 'react'
import { NavLink } from 'react-router-dom'

const Logout = () => {
    return (
        <ul className="right" >
        <li><NavLink to='/signup'>SignIn</NavLink></li>
       
        </ul>
    )
}

export default Logout