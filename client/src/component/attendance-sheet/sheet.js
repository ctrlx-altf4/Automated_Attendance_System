import React,{Component} from 'react'


class Sheet extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
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
}
export default Sheet