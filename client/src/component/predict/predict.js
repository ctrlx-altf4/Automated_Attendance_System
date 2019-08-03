import React, {Component} from 'react'

class Predict extends Component{
    constructor(){
        super();
        this.state={
            
        }
    }

    componentDidMount(){

    }
 
    make_prediction_py = (e)=>{
        fetch('/train');
    }

    render(){
        return(
            <div>
                <button onClick={this.make_prediction_py}>Predict</button>
                <script>
                    const make_prediction_py()=> console.log("fuck");
                </script>
            </div>
        )
    }
}

export default Predict;