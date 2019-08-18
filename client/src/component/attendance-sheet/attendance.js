import React,{Component} from 'react'
import Sheet from './sheet';
import SideBar from './side-bar';
import  './attendance.css';
import Navbar from './adminNavbar'



class Attendance extends Component{
    constructor(props){
        super(props);
        this.state={
            sheetUI:'dashboard'

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
                 <Navbar/>
            <div className="attendance">
                    <SideBar
                        updateUI ={this.updateUI}
                    />
                    <div className="sheet-wrapper">
                        <Sheet
                        updateUI ={this.updateUI}
                            sheetUI ={this.state.sheetUI}
                        />
                        </div>
                    </div>
                    
            </div>
        )
    }
    
}
export default Attendance