const express = require('express');
const path = require('path');
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const mongoose = require('mongoose');
const db = require('./config/db');
// const cv = require('opencv4nodejs');

const app = express();
const port = 5000;

app.use(express.static('collection'));


app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended:true}));

//connecting our application to mongodb
mongoose.connect(db.mongoURI,{useNewUrlParser:true}).then(
    ()=>{ console.log('Database Connected')},
    err=>{console.log('Can not connect to database '+err)}
)

//setting up Multer to handle the incoming image
const storage  = multer.diskStorage({
    destination:'./images',
    filename: function (req, file, callback){

        cb(null, `${new Date()}`);
    }
})


//for CORS connection
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.listen(port, ()=>{
    console.log("Server Started on port")
})

//setting up cloudinary config ..https://cloudinary.com/documentation/node_integration
cloudinary.config({
    cloud_name: 'auto-attendance-system',
    api_key: '835767194917565',
    api_secret:'AznHw38O8CYqb7K1HneVQ56EB9k'
})

app.post('/images',(req,res)=>{
    console.log(req.body.id);
    var i=1;
    var numImage=Math.min(15,Object.keys(req.body).length);
    function saveImage(){
       // let base64Image1 = req.body["user"+i].split(';base64').pop();
        cloudinary.uploader.upload(req.body["user"+i],{ public_id: req.body.id+"/user"+i},function(error, result) {
            i=i+1;
            if (i<=numImage){
                saveImage();
            }
        });
    //     fs.writeFile('images/image'+i+'.png',base64Image1,{encoding: 'base64'},function(err){
    //         i=i+1;
    //         if (i<=numImage){
    //             saveImage();
    //         }
    // })
    }
    saveImage();

    // var tst='user'+1;
    // let base64Image1 = req.body[tst].split(';base64').pop();
    // // cloudinary.uploader.upload(req.body.user1,function(error, result) {});
    // fs.writeFile('images/image1.png',base64Image1,{encoding: 'base64'},function(err){
    //     console.log('file 1 created');
    // })
    // //  res.send('got it');   
     
    // let base64Image2 = req.body.user2.split(';base64').pop();
    // // cloudinary.uploader.upload(req.body.user2,function(error, result) {});
    // fs.writeFile('images/image2.png',base64Image2,{encoding: 'base64'},function(err){
    //     console.log('file 2 created');
    //     let base64Image3 = req.body.user3.split(';base64').pop();
    // // cloudinary.uploader.upload(req.body.user3,function(error, result) {});
    //     fs.writeFile('images/image3.png',base64Image3,{encoding: 'base64'},function(err){
    //         console.log('file 3 created');
    //     })
    // })
    //  res.send('got it'); 
     
    
    //  res.send('got it'); 
     
    // let base64Image4 = req.body.user4.split(';base64').pop();
    // // cloudinary.uploader.upload(req.body.user4,function(error, result) {});
    // fs.writeFile('images/image4.png',base64Image4,{encoding: 'base64'},function(err){
    //     console.log('file 4 created');
    // })
    //  res.send('got it'); 
     
    // let base64Image5 = req.body.user5.split(';base64').pop();
    // // cloudinary.uploader.upload(req.body.user5,function(error, result) {});
    // fs.writeFile('images/image5.png',base64Image5,{encoding: 'base64'},function(err){
    //     console.log('file 5 created');
    // })
    //  res.send('got it');  
})



app.get('/home',(req, res)=>{
    const data =[
        {id:1, FistName:"Prajwal", LastName:"Pradhan"}
    ];
    res.send(data);
})

app.get('/predict',(req,res)=>{
   function runScript(){
    console.log("no");
    return spawn('python',[
        "-u",
        "C:/Users/hp/Desktop/Project/Neema/Face-recognition/make_prediction.py"
        // path.join(__dirname,'script.py'),          
    ]);
    
    }    
    const subprocess = runScript();

    subprocess.stdout.on('data', (data)=>{
        console.log(`data:${data}`);
    });
   
    res.send();
})

app.get('/collect',(req,res)=>{
    function runScript(){
        console.log("collect");
        return spawn('python',[
            "-u",
            "C:/Users/hp/Desktop/Project/Neema/Face-recognition/collectData.py"
            // path.join(__dirname,'script.py'),          
        ]);
        
        }    
        const subprocess = runScript();
    
        subprocess.stdout.on('data', (data)=>{
            console.log(`data:${data}`);
        });
       
        res.send();
})





// subprocess.stderr.on('data',(data)=>{
//     console.log(`error:${data}`);
// });
// subprocess.stderr.on('close',()=>{
//     console.log("closed");
// })
//console.log("fuck");