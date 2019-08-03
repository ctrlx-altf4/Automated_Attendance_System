import React, {Component} from 'react';
import './UserDetails.css'
import Camera from './Camera';

class UserDetails extends Component{
    state ={

    }
    render(){
        return(
        <div className="screen">
            <div className="screen-header">
                <h2> </h2>
            </div>
            <div className="screen-body">
                
                <div class="form-body">
                         <form onSubmit={this.props.handleSubmit}>
                        <div className="input-field">
                            <label>
                             <input className=""
                                    name ="firstName" 
                                    type="text" value={this.props.firstName}    
                                    onChange={this.props.handleChange}/>
                                    <span>First Name</span>
                            </label>
                           <label>
                           <input name ="lastName"   
                                    type="text" value={this.props.lastName}     
                                    onChange={this.props.handleChange}/>
                                    <span>Last Name</span>
                           </label>
                            <label>
                            <input name ="email"      
                                    type="text" value={this.props.email}       
                                    onChange={this.props.handleChange}/>
                                    <span>Email</span>
                            </label>
                            <label>
                            <input name ="contact"      
                                    type="text" value={this.props.contact}      
                                    onChange={this.props.handleChange}/>
                                    <span>Contact</span>
                            </label>
                           <label>
                           <input name ="address"     
                                    type="text" value={this.props.address}      
                                    onChange={this.props.handleChange}/>
                                    <span>Address</span>
                           </label>
                            <label>
                            <input name ="department"   
                                    type="text" value={this.props.department}   
                                    onChange={this.props.handleChange}/>
                                    <span>Department</span>
                            </label>
                           
                            <button className="submit-btn" type="submit"><span>Submit</span></button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default UserDetails;
