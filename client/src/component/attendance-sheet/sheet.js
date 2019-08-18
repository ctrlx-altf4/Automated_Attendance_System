import React,{Component} from 'react'

import Register from '../register/Register';
import logop from './logop.png';
import PieChart from 'react-minimal-pie-chart'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import DatePicker from "react-datepicker";
 import "react-datepicker/dist/react-datepicker.css";

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter'

import axios from 'axios';
import Predict from '../predict/predict';
import DataCollect from '../data_collect/data_collect';




class Sheet extends Component{
    constructor(props){
        super(props);
       
        var date;
        var today = new Date();
        // date= today.getDay();
        var weekday =['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday']
        var week= weekday[today.getDay()];
        
        date = today.getFullYear()+'-'+("0"+(today.getMonth()+1)).slice(-2)+'-'+("0"+today.getDate()).slice(-2);
        this.state={
            parent:null,
            data:[],
            present:[],
            date:date,
            stat:null,
            show:false,
            department:'BCT',
            year:'IV',
            sem:'II',
            startDate:today,
            detail_id:'', // detail page ko laagi id store garne thaau
            detail_info:'', // tyo id ko detail
            indiAttendance:'', // individual attendance
            indiAttendacne_id:'', 
            indiAttendace_fullName:'',
            curatedIndi:'',
      }
      this.renderEditable = this.renderEditable.bind(this);

      //To display modal for training model and starting attendance
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);

      this.handleDateChange=this.handleDateChange.bind(this);

      // Student detail dhekauaane page
      this.updateUI = this.updateUI.bind(this);

      //after verificaiton submit
      this.verifiedSubmit = this.verifiedSubmit.bind(this);

      this.fetchSubmit = this.fetchSubmit.bind(this);
      
      // this.getIndiAttendance= this.getIndiAttendance.bind(this);
     
    
    }
    //Student detail ko laagi look from students sheet
    updateUI =(num)=>{
      this.props.updateUI(num);
    }

    verifiedSubmit=()=>{
      alert('Data verified');
      axios.post('/verifiedData',this.state.present) 
      .then(res=>{
         console.log(res)
     })
    }

    componentDidMount(){
        axios.get('/retrieval')
        .then(response=>{
            this.setState({data:response.data});
        })
        .catch(function(error){
            console.log('error');
        })

        axios.get('/todaysAttendance/'+this.state.date)
        .then(response=>{
            this.setState({present:response.data});
        })
        .catch(function(error){
            console.log(error);
        }) 

        
        
    }
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      console.log(this.state.indiAttendance);
    }

    getDetail=()=>{
      console.log("I am from getDetail")
      axios.get('/retrieval/'+this.state.detail_id)
        .then(response=>{
            this.setState({detail_info:response.data});
            console.log(this.state.detail_info);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    getIndiAttendance=()=>{
      //individul attendance ko sheet
      axios.get('/indiAttendance')
      .then(response=>{
        this.setState({indiAttendance:response.data},function(){
          var individualAttendance = this.state.indiAttendance;
          this.setState({curatedIndi:individualAttendance[this.state.indiAttendance_id-501]['attendance']},function(){
             this.updateUI('indiAttendance')
          });
            // console.log(this.state.indiAttendance_id)
           
        })
      })
      .catch(function(error){
        console.log(error)
      })
      console.log(this.state.curatedIndi);

    }

/*======================================================================
      shows  and hides modal that displays training and attendance button
=========================================================================*/
    showModal=()=>{
      this.setState({show:true});
    }
    hideModal=()=>{
      this.setState({show:false});
    }

/*======================================================================
the Selected Class Depatment, Year and Semester
======================================================================*/
departmentSelect=(value)=>{
  console.log(value);
  this.setState({department: value.label})
  console.log(this.state.department)
}
yearSelect=(value)=>{
  this.setState({year: value.label})
}
semSelect=(value)=>{
  this.setState({sem: value.label})
}

/*====================================================================
        Date Change Handler
====================================================================*/
handleDateChange(value) {
  this.setState({
    startDate: value,
    date:value.getFullYear()+'-'+("0"+(value.getMonth()+1)).slice(-2)+'-'+("0"+value.getDate()).slice(-2)
  });
  console.log(this.state.date);
  axios.get('/todaysAttendance/'+this.state.date)
  .then(response=>{
      this.setState({present:response.data});
  })
  .catch(function(error){
      console.log(error);
  })
}

fetchSubmit(){
  
  axios.get('/todaysAttendance/'+this.state.date)
  .then(response=>{
      this.setState({present:response.data});
  })
  .catch(function(error){
      console.log(error);
  })
  console.log(this.state.present);
}
/*=======================================
       to make react-table editable
======================================*/
    renderEditable(cellInfo) {
        return (
          <div
            className="status-field"
            onClick={e=>{
              const present=[...this.state.present];
              alert(present[cellInfo.index][cellInfo.rowInfo]);
              if(present[cellInfo.index][cellInfo.column.id]==='P'){
                present[cellInfo.index][cellInfo.column.id] = 'A';
                this.setState({ present });
              }
              else{
                present[cellInfo.index][cellInfo.column.id] = 'P';
                this.setState({ present });
              }
            }}
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
        this.state.present.map(statDeterminer);
        function statDeterminer(obj){
            if(obj['status']=='A'){
                count++;
            }  
        }

        // For dropdown
        const department = ['BCT', 'BEX', 'BEL','BCE'];
        const year = ['I', 'II', 'III','IV']
        const sem = ['I','II']

        const defaultDepartment = department[0]; 
        const defaultYear = year[3];
        const defaultSem = sem[1];
     
        

        /*=======================================
                attendance sheet prepare
        ======================================*/
          const presentColumns=[
            {
                Header:'Roll No.',
                accessor: 'name',
                headerClassName: 'table-header',
                width:100 , 
              }, 
              {
                Header:'Name',
                accessor: 'firstName',
                headerClassName: 'table-header'
              },
              {
                Header: 'Recognized Image',
                headerClassName: 'table-header',
              //  accessor:'url',
                Cell: (row) => {
                  console.log(row.original.url);
                  

                  return <div>
                    {/* <a href="#" class="tooltip"> */}
                 <img height={34} src={row.original.url}></img>
                  {/* <span>
                      <img src={row.original.url} />
                  </span>
              </a></div> */}
              </div>
                },
              },
              {
                getProps: (state, rowInfo) => {
                    if (rowInfo && rowInfo.row) {
                      return {
                        style: {
                          background:
                            rowInfo.row.status === 'A'? "red" : "green",    
                        },
                        onClick: (e,handleOriginal)=>{
                            if(rowInfo.row.status=='A'){
                              rowInfo.row.status='P'
                            }
                            else{
                              rowInfo.row.status='A'
                            }
                        }
                      };
                    } else {
                      return {};
                    }
                  },
                Header: 'status',
                accessor: 'status',
                Cell:this.renderEditable,  
                headerClassName: 'table-header',
                width:100  
              }, 
          ]
/*=======================================
        Student Datasheet prepare
======================================*/
          const dataColumns = [{
            Header: 'Roll No.',
            accessor:'rollNo',
            width:100,
            headerClassName: 'table-header'
      
          },{
            Header: 'FirstName',
            accessor: 'firstName', 
            // filterMethod: (filter, rows) =>
            //     matchSorter(rows, filter.value, { keys: ["firstName"] }),
            headerClassName: 'table-header'
          }, {
            Header: 'LastName',
            accessor: 'lastName',
            headerClassName: 'table-header'
            
          }, {
            Header: 'Email',
            accessor: 'email',
            headerClassName: 'table-header'
          }, {
            Header: 'Contact',
            accessor: 'contact',
            headerClassName: 'table-header'
          }, {
            Header: 'Address',
            accessor: 'address',
            headerClassName: 'table-header'
          }, {
            Header: 'Department',
            accessor: 'department',
            headerClassName: 'table-header',
            
          }]

          /*=============================================
            Individual datasheet prepare
          ==============================================*/
          const individualData=[
            {
              Header:'Date',
              accessor:'Date',
              headerClassName: 'table-header'
              },
              {
                getProps: (state, rowInfo) => {
                  if (rowInfo && rowInfo.row) {
                    return {
                      style: {
                        background:
                          rowInfo.row.status === 'A'? "red" : "green",    
                      },
                      onClick: (e,handleOriginal)=>{
                          if(rowInfo.row.status=='A'){
                            rowInfo.row.status='P'
                          }
                          else{
                            rowInfo.row.status='A'
                          }
                      }
                    };
                  } else {
                    return {};
                  }
                },
                Header:'Status',
                accessor:'status',
                headerClassName: 'table-header',
                width:100
              }
          ]
       
       
        /*=======================================
        Actual rendering beginning from here---> Dashboard 
======================================*/
     if(this.props.sheetUI==='dashboard'){
            return(
                <div>
                       {/* <img className="tulogo" src={tuLogo}/> */}
                       {/* <h1>&nbsp;&nbsp;&nbsp;&nbsp;Tribhuwan University Institute of Engineering Pulchowk Campus, Lalitpur</h1> */}
                <div className="box" onClick={this.showModal}>
                 <h1> &nbsp;&nbsp; BCT </h1>
                 <div class="new-label"><span></span></div>
                    <button className="boax">
                      more information
                    </button>
                </div>
    
                <div className="box" onClick={this.showModal}>
                  <h1>&nbsp;&nbsp; BEX </h1>
                  <div class="new-label"><span></span></div>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div className="box" onClick={this.showModal}>
                  <h1> &nbsp;&nbsp;BEL </h1>
                  <div class="new-label"><span></span></div>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div className="box" onClick={this.showModal}>
                  <h1> &nbsp;&nbsp;BCE </h1>
                  <div class="new-label"><span></span></div>
                   <button className="boax">
                   More Information 
                </button>
                </div>
                <div>
                <Modal show={this.state.show}
                        hideModal={this.hideModal}>
               </Modal>
                  
                <div className="m-box">
                   <h1> Today's Attendance </h1>
                   <PieChart className="chart"
                 data={[
                 { title: 'One', value: 10, color: '#E38627' },
                   { title: 'Two', value: 15, color: '#C13C37' },
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
/*==============================================================
                 Attendance Sheet
==================================================================*/
        else if(this.props.sheetUI==='attendance-sheet'){
            //Today's Attendance
            return(
                <div className="attendance-sheet">
                  <div className="attendance-header">
                    <Dropdown className="depo-dropdown" options={department}  value={defaultDepartment} onChange={values => this.departmentSelect(values)} placeholder="Select an option" />
                    <Dropdown className="depo-dropdown" options={year} onChange={values => this.yearSelect(values)} value={defaultYear} placeholder="Select an option" />
                    <Dropdown className="depo-dropdown" options={sem} onChange={values => this.semSelect(values)} value={defaultSem} placeholder="Select an option" />
                    <h1>{this.state.department} /{this.state.year}/{this.state.sem}</h1>
                  </div>
                  <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      className="date-box"
                    />
                    <button className="fetch-btn" onClick={this.fetchSubmit}>Fetch</button>

                    <p>Present Percentage: {((total-count)/total*100).toFixed(2)}%</p>
                    <div className="attendance-table">
                      <ReactTable
                        getTdProps={(state, rowInfo, column, instance) => {
                          return {
                            onClick: (e, handleOriginal) => {
                              this.setState({indiAttendance_id:rowInfo.original.name, 
                                indiAttendace_fullName:rowInfo.original.firstName},function(){
                                this.getIndiAttendance();
                              })
                              // alert(this.state.indiAttendance_id)
                                
                              if (handleOriginal) {
                                handleOriginal()
                              }
                            }
                          }
                        }}
                          data={this.state.present}
                          columns={presentColumns}
                          defaultPageSize={10}
                          defaultSorted={[
                            {
                              id: "name",
                              asc: true
                            }
                          ]}
                          className="-striped -highlight"
                      />
                    </div>
                    <button className="modal-btn" onClick={this.verifiedSubmit}>Verify</button> 
                   
                </div>        
                
            )
        }
/*==============================================================
                 Students data Sheet
==================================================================*/
else if(this.props.sheetUI==='Students'){
  return(
      <div>
          
          <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    this.setState({detail_id:rowInfo.original._id},function(){
                      this.getDetail();
                    })
                    alert(rowInfo.original._id)
                      this.updateUI('details')
                    if (handleOriginal) {
                      handleOriginal()
                    }
                  }
                }
              }}
                
              data={this.state.data}
              columns={dataColumns}
              defaultPageSize={10}
              defaultSorted={[
                {
                  id: "rollNo",
                  asc: true
                }
              ]}
              className="-striped -highlight"
          />
      </div>
  )
}
        else if(this.props.sheetUI==='details'){
            return(
                <div>
                   
                </div>
            )
        }
        else if(this.props.sheetUI==='indiAttendance'){
          return(
            <div>
              <h1>{this.state.indiAttendance_id}- {this.state.indiAttendace_fullName}</h1>
              <div className="indiAttendance">
                <ReactTable
                    data={this.state.curatedIndi}
                    columns={individualData}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
              </div>
              </div>
          )
        }
       
    }
    
    
}
export default Sheet



/*===========================================================
arko component banaauna alxi laagyo ==> its a modal component
=============================================================*/

const Modal = ({show,hideModal}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
        <div className="modal-content">
            <div className="close" onClick={hideModal}>+</div>
            <img src="modal-icon.jpg" width="200px" height="200px" alt=" "></img>
            <Predict/>
            <DataCollect/>
          </div>
    </div>
  );
};
