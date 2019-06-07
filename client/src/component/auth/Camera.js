import React, {Component} from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'
import './Camera.css'


class Camera extends Component{
    constructor(){
        super();
        this.state={
            samplePic:null,
            imageList:{},
            counter:0 
        }
        
        
    }
    setRef = webcam =>{
        this.webcam = webcam;
    };

    
    capture =()=>{
        this.state.counter++;
        var ul = document.getElementById('loadImage');
        var img = document.createElement('img');
       
        ul.appendChild(img);
        img.setAttribute('src', this.webcam.getScreenshot());
        img.setAttribute('height',350/4);
        img.setAttribute('width',350/4);
        this.state.imageList["User-"+this.state.counter] =this.webcam.getScreenshot();
    };

    
    imageUploadHandler=()=>{
        console.log('entered');
        this.setState({
            samplePic: this.webcam.getScreenshot()
        })
        console.log(this.state.samplePic)

        const fd = new FormData();
        fd.append('image','no');
        fd.append('yes','no');

        // console.log(fd);          <!-- khai yo sab kaam nai laagena kina ho>
        var yes = {'image':'no', 'no':'yes'};

        axios.post('http://localhost:5000/images',this.state.imageList,{
            onUploadProgress: progressEvent =>{
                console.log(progressEvent.loaded/progressEvent.total);
            }
        })
        .then(res=>{
            console.log(res)
        })

    }

    render(){
        const videoConstraints ={
            width: 250,
            height:250,
            facingMode: "user"
          
        }
        return(  
          <div>
            
                 <Webcam
                 audio ={false}
                 ref ={this.setRef}
                 screenshotFormat = "image/jpeg"
                 videoConstraints = {videoConstraints}
                 />  
                 <br/>                                   
                 <button id="cap-button" onClick = {this.capture}>Capture Photo</button>
                 <button onClick={this.imageUploadHandler}>Upload Image</button>
                 <br/>
                
                 <ul id="loadImage" ></ul>  
                
                           
                 </div>     
         );
    }
    
}

export default Camera