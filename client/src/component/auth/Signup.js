import React, { Component } from 'react'


class Signup extends Component {
    state ={

    }
    handleChange = (e) => {
        console.log(e)
    }
    handleSubmit = (e) => {
        console.log(e)
    }
    render(){
        return(
        <div className="container">
        <form onSubmit={this.handleSubmit} className="grey darken-3">
        <h5 className="white-text">Sign Up</h5>
        <div className="input-field">
        <label htmlfor="firstname">First Name</label>
        <input type="text" id="firstname" onChange={this.handleChange}/>
        </div>
        <div className="input-field">
        <label htmlfor="lastname">Last Name</label>
        <input type="text" id="lastname" onChange={this.handleChange}/>
        </div>
        <div className="input-field">
        <label htmlfor="email">Email</label>
        <input type="email" id="email" onChange={this.handleChange}/>
        </div>
        <div className="input-field">
        <label htmlfor="password">password</label>
        <input type="password" id="password" onChange={this.handleChange}/>
        </div>
        <div className="input-field">
        <button className="btn green darken-4 z-depth-0">Your Image</button>
        </div>
        <div className="input-field">
        <button className="btn blue darken-4 z-depth-0">Sign Up</button>
        </div>
        </form>
       
    </div>
        )
    }
}
export default Signup