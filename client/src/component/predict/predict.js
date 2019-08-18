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
        alert('Model training started..');
        fetch('/train');
    }

    render(){
        return(
            <div>
                <button className="modal-btn"onClick={this.make_prediction_py}><i class="fas fa-user-cog">&nbsp; &nbsp;Train Model</i></button>
                <script>
                    const make_prediction_py()=> console.log("fuck");
                </script>
            </div>
        )
    }
}

export default Predict;