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
    data_collect_py = (e)=>{
        fetch('/collect');
    }
    render(){
        return(
            <div>
                <button onClick={this.data_collect_py}>Collect</button>
                <script>
                    const make_prediction_py()=> console.log("fuck");
                </script>
            </div>
        )
    }
}

export default DataCollect;