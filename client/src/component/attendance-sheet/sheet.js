import React,{Component} from 'react'


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
                <div className="box">
                 <h1>  BCT </h1>
                   <button className="boax">
                   more information
                </button>
                </div>
    
                <div className="box">
                  <h1> BEX </h1>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div className="box">
                  <h1> BEL </h1>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div>
                <div className="m-box">
                   <h1> Today's Attendance </h1>
                  <button className="box-button1">  BCT 80% </button>
                  <button className="box-button">  BEX 70% </button>
                   <button className="box-button"> BEL 30% </button>
                </div>
                <div className="last-box">
               <h1>BCT</h1>
               <p>present &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-eye"></i></p>
               <p>Absent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-eye-slash"></i></p>
               <p>Late &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-clock"></i></p>
               

                </div>
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
                    Four
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