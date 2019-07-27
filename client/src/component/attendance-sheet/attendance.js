
import React,{Component} from 'react'
import Sheet from './sheet';
import SideBar from './side-bar';
import  './attendance.css';
import Navbar from './adminNavbar'


class Attendance extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div className="attendance">
                {/* <div className ="sidebar"> */}
                    <SideBar/>
                {/* </div> */}
                {/* <div className="sheet"> */}
                    <Sheet/>
                {/* </div> */}
                <Navbar/>
                
               
                
            </div>
        )
    }
}
export default Attendance