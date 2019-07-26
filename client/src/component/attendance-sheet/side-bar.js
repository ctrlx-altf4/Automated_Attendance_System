import React,{Component} from 'react'


class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div className="sidebar">
               <div className="sidebar-header">
                   I am the head
               </div>
               <hr></hr>
               <div className="sidebar-body">
                   I am the body
               </div>

            </div>
        )
    }
}
export default Sidebar