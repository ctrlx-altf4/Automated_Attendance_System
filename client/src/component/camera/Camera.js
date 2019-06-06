import React, {Component} from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'


class Camera extends Component{
    constructor(){
        super();
        this.state={
            samplePic:null,
            imageList:{},
            counter:0,
            value:''
        }
        this.handleChange = this.handleChange.bind(this);
       
        
    }
    setRef = webcam =>{
        this.webcam = webcam;
    };

    handleChange(event) {
        this.setState({value: event.target.value});
      }
      
    capture =()=>{
        this.state.counter++;
        var ul = document.getElementById('loadImage');
        var img = document.createElement('img');
        ul.appendChild(img);
        img.setAttribute('src', this.webcam.getScreenshot());
        img.setAttribute('height',350/4);
        img.setAttribute('width',350/4)
        this.state.imageList["user"+this.state.counter]=this.webcam.getScreenshot();
        
    };

    imageUploadHandler=()=>{
        console.log('entered');
        this.setState({
            samplePic: this.webcam.getScreenshot()
        })
        console.log(this.state.samplePic)
        this.state.imageList["id"]= this.state.value;

        // const fd = new FormData();
        // fd.append('image','no');
        // fd.append('yes','no');

        // console.log(fd);          <!-- khai yo sab kaam nai laagena kina ho>
        

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
            width: 350,
            height:350,
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
                 <input type="text" name="name"></input>
                 <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                 <button onClick = {this.capture}>Capture Photo</button>
                 <button onClick={this.imageUploadHandler}>Upload Image</button>
                 <br/>
                 <ul id="loadImage"></ul>

            </div>
           
         );
    }
    
}

export default Camera;