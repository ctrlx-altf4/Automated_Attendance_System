import React, {Component} from 'react';
import './UserDetails.css'

class UserDetails extends Component{
    state ={

    }
    render(){
        return(
        <div className="screen"> 
            <div className="screen-header">
                <h1> </h1>
            </div>
            <div className="screen-body">
                <div class="modal">
                    <div className="modal-design">
                        <div className="round-shape"></div>
                    </div>
                </div>
                
                <div className="form-body">
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="input-field">
                            <label>
                            <input name ="firstName" 
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
                           
                            {/* <button className="submit-btn" type="submit"><span>Submit</span></button> */}
                        </div> 
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default UserDetails;
