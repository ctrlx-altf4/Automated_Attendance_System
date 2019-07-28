import React,{Component} from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';


class Sheet extends Component{
    constructor(props){
        super(props);
       
        var date;
        var today = new Date();
        // date= today.getDay();
        var weekday =['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday']
        
        date = today.getFullYear()+'/'+(today.getMonth()+1)+'-'+ weekday[today.getDay()];
        this.state={
            parent:null,
            data:[],
            present:[],
            date:date,
            stat:null
      }
      console.log(date);

    }
    componentDidMount(){
        axios.get('/retrieval')
        .then(response=>{
            this.setState({data:response.data});
        })
        .catch(function(error){
            console.log('error');
        })

        axios.get('/todaysAttendance')
        .then(response=>{
            this.setState({present:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
       
        
    }
    
    render(){
        // var count=0;
        // var total= this.state.present.length;
        // // console.log(this.state.present.length);
        // console.log(total);
        // this.state.present.map(statDeterminer);
        // function statDeterminer(obj){
        //     if(obj['status']=='A'){
        //         count++;
        //     }  
        // }

          const presentColumns=[
            {
                Header: 'Name',
                accessor: 'name' // String-based value accessors!
              }, 
              {
                getProps: (state, rowInfo) => {
                    if (rowInfo && rowInfo.row) {
                      return {
                        style: {
                          background:
                            rowInfo.row.status === 'A' ? "red" : "green"
                        }
                      };
                    } else {
                      return {};
                    }
                  },
                Header: 'status',
                accessor: 'status' // String-based value accessors!
              }, 
          ]
       
          const dataColumns = [{
            Header: 'firstName',
            accessor: 'firstName' // String-based value accessors!
          }, {
            Header: 'lastName',
            accessor: 'lastName',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          }, {
            // id: 'friendName', // Required because our accessor is not a string
            Header: 'Email',
            accessor: 'email',// Custom value accessors!
          }, {
            Header: 'contact',//props => <span>Friend Age</span>, // Custom header components!
            accessor: 'contact'
          }, {
            Header: 'address',
            accessor: 'address',
          }, {
            Header: 'department',
            accessor: 'department',
          }]
        if(this.props.sheetUI===1){
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
        else if(this.props.sheetUI===2){
            return(
                <div>
                    changed
                </div>
            )
        }
        else if(this.props.sheetUI===3){
            return(
                <div>
                    <ReactTable
                        data={this.state.data}
                        columns={dataColumns}
                    />
                </div>
            )
        }
        else if(this.props.sheetUI===4){
            //Today's Attendance
            return(
                <div>
                    <p>{this.state.date}</p>
                    {/* <p>Present Percentage: {(total-count)/total*100}%</p> */}
                    <ReactTable
                        data={this.state.present}
                        columns={presentColumns}
                    />
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