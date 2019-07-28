import React,{Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


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
                   I am the head
               </div>
               <hr></hr>
               <div className="sidebar-body">
                   <ul>
                       <button  className="sidebar-button" onClick={()=>this.props.updateUI(2)}>Add</button>
                       <button className="sidebar-button"  onClick={()=>this.props.updateUI(3)}>Add</button>
                       <button className="sidebar-button" onClick={()=>this.props.updateUI(4)}>Add</button>
                    
                   </ul>
               
               </div>

            </div>
            </Router>
        )
    }
}
export default Sidebar