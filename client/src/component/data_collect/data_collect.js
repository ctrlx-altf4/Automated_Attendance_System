import React, {Component} from 'react'
import './data_collect.css'

class DataCollect extends Component{
    constructor(){
        super();
        this.state= {
            datas:[]
        };
    }
    componentDidMount(){
        // fetch('/home')
        // .then(res=>res.json())
        // .then(datas=> this.setState({datas}, ()=>{console.log('fetched', datas)}));
    }
    predict_py = (e)=>{
        alert("Attendance Started..")
        fetch('/predict').then(res=> console.log(res));
    }
    render(){
        return(
            <div>
                <button className="modal-btn" onClick={this.predict_py}><i class="fas fa-video">&nbsp; &nbsp; Start Attendance</i></button>
                <script>
                   
                </script>
            </div>
        )
    }
}

export default DataCollect;