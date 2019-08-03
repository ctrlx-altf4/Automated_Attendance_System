import React,{Component} from 'react'

import Register from '../register/Register';
import logop from './logop.png';
import PieChart from 'react-minimal-pie-chart'

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
      this.renderEditable = this.renderEditable.bind(this);

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
    renderEditable(cellInfo) {
        console.log('po')
        return (
          <div
            
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const present = [...this.state.present];
              present[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ present });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.present[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }
    
    render(){
        var count=0;
        var total= this.state.present.length;
        // console.log(this.state.present.length);
        console.log(total);
        this.state.present.map(statDeterminer);
        function statDeterminer(obj){
            if(obj['status']=='A'){
                count++;
            }  
        }

          const presentColumns=[
            {
                Header:'Name',
                accessor: 'name',
                Cell:this.renderEditable, 
              }, 
              {
                getProps: (state, rowInfo) => {
                    if (rowInfo && rowInfo.row) {
                      return {
                        style: {
                          background:
                            rowInfo.row.status === 'A'? "red" : "green",
                            
                        }
                      };
                    } else {
                      return {};
                    }
                  },
                Header: 'status',
                accessor: 'status',
                width:50,
                Cell:this.renderEditable,
               
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
        console.log(this.state.present);
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
        else if(this.props.sheetUI===3){
            return(
                <div>
                    <h1>  BCT IV/II</h1>
                    <ReactTable
                        data={this.state.data}
                        columns={dataColumns}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </div>
            )
        }
        else if(this.props.sheetUI===4){
            //Today's Attendance
            return(
                <div>

                    <p>{this.state.date}</p>
                    <p>Present Percentage: {(total-count)/total*100}%</p>
                    <ReactTable
                        data={this.state.present}
                        columns={presentColumns}
                        defaultPageSize={10}
                        className="-striped -highlight"

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