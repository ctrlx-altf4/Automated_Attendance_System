
import React,{Component} from 'react'
import Sheet from './sheet';
import SideBar from './side-bar';
import AdminNavbar from './adminNavbar';
import  './attendance.css'


class Attendance extends Component{
    constructor(props){
        super(props);
        this.state={
            sheetUI:1

        }
        this.updateUI = this.updateUI.bind(this);
    }
    updateUI=(num)=>{
        this.setState({
            sheetUI:num
        })
        
    }

    render(){
        return(
            <div>
                <AdminNavbar/>
                 <div className="attendance">
                    <SideBar
                        updateUI ={this.updateUI}
                    />
                    <Sheet
                        sheetUI ={this.state.sheetUI}
                    />
                </div>
            </div>
        )
    }
    
}
export default Attendance