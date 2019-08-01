import React,{Component} from 'react'
import Register from '../register/Register';
import logop from './logop.png';
import PieChart from 'react-minimal-pie-chart'


class Sheet extends Component{
    constructor(props){
        super(props);
        this.state={
              
        }
    }  

    render(){
        if(this.props.sheetUI==1){
            return(
                <div className="sheet-wrapper">
                    <div className="sheet">
                        
                        <div className="sheet-header">
                                Attendance Sheet
                        </div>
                        <div className="sheet-body">
                            I am from body;
                        </div>
                    </div>
                    
                </div>
            )
        }
        else if(this.props.sheetUI==2){
            return(
                <div>
                    <div className="navline">
                    {/* <img className="tulogo" src={tuLogo}/> */}
                        {/* <h1>&nbsp;&nbsp;&nbsp;&nbsp;Tribhuwan University Institute of Engineering Pulchowk Campus, Lalitpur</h1> */}
                        </div >
                <div className="box">
                 <h1> &nbsp;&nbsp; BCT </h1>
                   <button className="boax">
                   more information
                </button>
                </div>
    
                <div className="box">
                  <h1>&nbsp;&nbsp; BEX </h1>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div className="box">
                  <h1> &nbsp;&nbsp;BEL </h1>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div className="box">
                  <h1> &nbsp;&nbsp;BCE </h1>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div>
                <div className="m-box">
                   <h1> Today's Attendance </h1>
                   <PieChart className="chart"
                 data={[
                 { title: 'One', value: 10, color: '#E38627' },
                   { title: 'Two', value: 15, color: '#C13C37' },
                 { title: 'Three', value: 20, color: '#6A2135' },
                 { title: 'Three', value: 15, color: '#6A4565' },
                   ]}
                />
                  <button className="box-button1"> <h3> BCT 80%</h3> </button>
                  <button className="box-button"> <h3> BEX 70% </h3></button>
                   <button className="box-button"><h3> BEL 30%</h3> </button>
                   <button className="box-button"><h3> BCE 30%</h3> </button>
                </div>
                <div className="last-box">
               <h1>BCT</h1>
               <p>present &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-eye"></i></p>
               <p>Absent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-eye-slash"></i></p>
               <p>Late &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-clock"></i></p>
               

                </div>
                </div>
                <div className="row">
                    <img className="tulogo" src={logop}/>
                        <h3>Tribhuwan University Institute of Engineering Pulchowk Campus, Lalitpur</h3>
                        </div>
                 </div>
            )
        }
        else if(this.props.sheetUI==3){
            return(
                <div>
                    Three
                </div>
            )
        }
        else if(this.props.sheetUI==4){
            return(
                <div>
                    <Register/>
                </div>
            )
        }
        else{
            return(
                <div>
                    not found
                </div>
            )
        }
       
    }
}
export default Sheet