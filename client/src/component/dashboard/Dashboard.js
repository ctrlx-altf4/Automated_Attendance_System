import React, { Component } from 'react'
import Contents from './Contents'
import { Link } from 'react-router-dom'


class Dashboard extends Component {
    render(){
        return(
        <div className="dashboard container">
        <div className="row">
        <div className="col s12 m6">
        <Contents/>
        </div>
        <div className="col s12 m5 offset-m1"> <h3>Manage daily recurring tasks in one place</h3>
        <Link to='/signin' className='w3-button w3-hover-red' >Access Here</Link>
        </div>
        </div>
    </div>
        )
    }
}
export default Dashboard