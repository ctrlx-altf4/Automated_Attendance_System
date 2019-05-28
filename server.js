const express = require('express');
const path = require('path');
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const multer = require('multer');
// const cv = require('opencv4nodejs');

const app = express();
const port = 5000;

app.use(express.static('collection'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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


app.post('/images',(req,res)=>{
    console.log(req.body.image);
    console.log("yaa aayo hai")
     res.send('got it');    
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