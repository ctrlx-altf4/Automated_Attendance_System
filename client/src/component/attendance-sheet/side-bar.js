import React,{Component} from 'react'
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import face from './face.jpg';


class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.updateUI = this.updateUI.bind(this);
    }
    updateUI =(num)=>{
        this.props.updateUI(num);
    }

    render(){
    
        return(
            <Router>
            <div className="sidebar">
               <div className="sidebar-header">
                   <div className="column">
                       <img className="faace" src={face}/>
                       <h3 className="toptext">Automated Attendance</h3>
                   </div>
               <div className="search-container">
                    <form>
                    <input type="text" className="search-bar" placeholder="  Search..." name="search"/>              
                    </form>
             </div>
            <button className="main-button"> Main navigation</button>
               </div>
                   <div className="sidebar-ul">
                       <a className="sidebar-button active" onClick={()=>this.props.updateUI('dashboard')}><i className="fa fa-dashboard"></i>&nbsp;&nbsp; Dashboard</a>
                       <a className="sidebar-button" onClick={()=>this.props.updateUI('attendance-sheet')}><i  className="fas fa-edit"></i>&nbsp;&nbsp; Attendance</a>
                       <a className="sidebar-button" onClick={()=>this.props.updateUI('Students')}><i  className="fas fa-edit"></i>&nbsp;&nbsp; Students</a>
                       <a className="sidebar-button" onClick={()=>this.props.updateUI(4)}><i  className="fas fa-edit"></i>&nbsp;&nbsp; Update details</a>
                       <a className="sidebar-button" onClick={()=>this.props.updateUI(3)}><i className="fa fa-bars"></i>&nbsp;&nbsp; Statistics</a>
                       <a className="sidebar-button" onClick={()=>this.props.updateUI(2)}><i className="fas fa-user"></i>&nbsp;&nbsp; Profile</a>
                       <a className="sidebar-button" onClick={()=>this.props.updateUI(1)}><i className="fa fa-sign"></i>&nbsp;&nbsp; Log Out</a>                 
                   </div>
               
               </div>
            </Router>
        )
    }
}
export default Sidebar