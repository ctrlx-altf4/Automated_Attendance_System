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
                    changed
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