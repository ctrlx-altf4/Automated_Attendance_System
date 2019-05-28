import React, {Component} from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'


class Camera extends Component{
    constructor(){
        super();
        this.state={
            samplePic:null
        }
    }
    setRef = webcam =>{
        this.webcam = webcam;
    };

    

    capture =()=>{
        var img = new Image();
        img.src= this.webcam.getScreenshot();
            
        // const imageSrc = this.webcam.getScreenshot();
        img.onload = function(){
            
           var canvas = document.getElementById('loadImage');

           var ctx = canvas.getContext('2d');

           img.width=img.width/4;
           img.height=img.height/4;

           ctx.width =img.width;
           ctx.height = img.height;

           ctx.drawImage(img, 0,0,ctx.width,ctx.height);
        }
        
    };

    imageUploadHandler=()=>{
        console.log('entered');
        this.setState({
            samplePic: this.webcam.getScreenshot()
        })
        console.log(this.state.samplePic)

        // const fd = new FormData();
        // fd.append('image',"yes");
        // console.log(fd);          <!-- khai yo sab kaam nai laagena kina ho>

        axios.post('http://localhost:5000/images',{'image':this.webcam.getScreenshot()},{
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
                //  height ={350}
                //  width = {350}
                 ref ={this.setRef}
                 screenshotFormat = "image/jpeg"
                 videoConstraints = {videoConstraints}
                 />
                 <br/>
                 <button onClick = {this.capture}>Capture Photo</button>
                 <button onClick={this.imageUploadHandler}>Upload Image</button>
                 <br/>
                 <canvas id="loadImage"></canvas>

            </div>
           
         );
    }
    
}

export default Camera;