
import React,{Component} from 'react'
import Sheet from './sheet';
import SideBar from './side-bar';
import  './attendance.css';
import Navbar from './adminNavbar'


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
        console.log(this.state.sheetUI);
    }

    render(){
        return(
           
            <div>
                 <Navbar/>
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