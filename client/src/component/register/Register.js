import React, {Component} from 'react'
import Camera from './Camera';
import UserDetails from './UserDetails';
import axios from 'axios';
import './register.css'

class Register extends Component{
    constructor(props){
        super(props)

        this.state={
            firstName: '',
            lastName:'',
            email:'',
            contact:'',
            address:'',
            department:'',
            imageList:{}
        } 

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadDataFromParent = this.uploadDataFromParent.bind(this);
    }
    state ={

    }

    setStates=()=>{

    }
   uploadDataFromParent =(ImageList)=>{
       this.state.imageList=ImageList;
       this.state.imageList["firstName"]= this.state.firstName;
       this.state.imageList["lastName"]= this.state.lastName;
       this.state.imageList["email"]= this.state.email;
       this.state.imageList["contact"]= this.state.contact;
       this.state.imageList["address"]= this.state.address;
       this.state.imageList["department"]= this.state.department;
       console.log(this.state.imageList);
        alert("Thank you For your contribution");
       axios.post('/api/images',this.state.imageList,{
            onUploadProgress: progressEvent =>{
                console.log(progressEvent.loaded/progressEvent.total);
            }
       }) .then(res=>{
             console.log(res)
       })
   }

    handleChange = (e) => {
        const {name,value}= e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        
       
    }

    render(){
        return(
            <div className="column">
              
                <Camera
                        handleChange ={this.handleChange}
                        handleSubmit = {this.handleSubmit}
                        uploadDataFromParent={this.uploadDataFromParent}

                    />
                   <UserDetails
                        handleChange ={this.handleChange}
                        handleSubmit = {this.handleSubmit}
                    />
            </div>   
        );
      
    }
}

export default Register;
