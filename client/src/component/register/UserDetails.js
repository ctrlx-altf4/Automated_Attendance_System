import React, {Component} from 'react';
import './UserDetails.css'

class UserDetails extends Component{
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
            <div className="screen">
                <div className="screen-header">
                     <h5></h5>
                </div>
                <div className="screen-body">
                    <div class="modal">
                        <div class="modal-product">
                            <div class="round-shape"></div>
                        </div>
                        <div className="details">
                            <div className="details-info">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-field">
                                    <i class="fas fa-user"></i><input type="text" id="firstname" placeholder="FirstName" onChange={this.handleChange}/>
                                    </div>
                                    <div className="input-field">
                                            <input type="text" id="lastname" placeholder="LastName" onChange={this.handleChange}/>
                                    </div>
                                    <div className="input-field">
                                        <input type="email" id="email" placeholder="Email" onChange={this.handleChange}/>
                                    </div>
                                    <div className="input-field">
                                        <input type="password" id="password" placeholder="Passwor"onChange={this.handleChange}/>
                                    </div>
                                    <div className="input-field">
                                            <button className="btn green darken-4 z-depth-0">Your Image</button>
                                    </div>
                                    <div className="input-field">
                                        <button className="btn blue darken-4 z-depth-0">Sign Up</button>
                                    </div> 
                                </form>
                            </div>      
                        </div>   
                    </div>   
                </div>                    
            </div>
        </div>
        )
    }
}

export default UserDetails;
