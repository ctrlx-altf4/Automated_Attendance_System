const express = require('express');
const path = require('path');
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');


//-------------------------Database Setup-----------------------------
const mongoose = require('mongoose');
const db = require('./config/db');

//importing model 
const studentModel = require('./models/student');
const imageModel= require('./models/trainingImage');

//connecting our application to mongodb
mongoose.connect(db.mongoURI,{useNewUrlParser:true}).then(
    ()=>{ console.log('Database Connected')},
    err=>{console.log('Can not connect to database '+err)}
)

//--------------------Database Setup ends here-------------------------
//************************************************************************


//-------------------------CLOUDINARY SETUP BEGINS-----------------------------
const cloudinary = require('cloudinary').v2;

//setting up cloudinary config ..https://cloudinary.com/documentation/node_integration
cloudinary.config({
    cloud_name: 'auto-attendance-system',
    api_key: '835767194917565',
    api_secret:'AznHw38O8CYqb7K1HneVQ56EB9k'
})
//--------------------CLOUDINARY Setup ends here-------------------------
//************************************************************************


const app = express();
const port = process.env.PORT ||5000;

app.use(express.static('collection'));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended:true}));



//setting up Multer to handle the incoming image
const storage  = multer.diskStorage({
    destination:'./images',
    filename: function (req, file, callback){

        cb(null, `${new Date()}`);
    }
})


//------------------for CORS connection--------------------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.listen(port, ()=>{
    console.log("Server Started on port")
})

//------------------------CORS Connection Ends here---------------

app.post('/api/images',(req,res)=>{
    console.log(req.body.lastName)
    var numImage=Math.min(15,Object.keys(req.body).length-6);
    var i=1;
    function saveImage(){
        let base64Image = req.body["user"+i].split(';base64').pop();
        var dir = './images/'+ req.body.firstName +" "+ req.body.lastName;
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFile(path.join(dir,"image"+i+".png"), base64Image, 'base64', function(err) {
            if(err)
                console.log(err);
          });
        cloudinary.uploader.upload(req.body["user"+i],{ folder: req.body.firstName+" "+ req.body.lastName},function(error, result) {
            i=i+1;
            if (i<=numImage){
                saveImage();
            }    
         })
    }
    saveImage();
          
                var i=1;
                var studentDetails={
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    contact: req.body.contact,
                    address: req.body.address,
                    department: req.body.department
                }

const StudentModel = new studentModel(studentDetails);
StudentModel.save();
                //     /* commented only for heroku*/
                //         //  /************ Saving to Database ***************/  //
                //    studentModel.create(studentDetails,(err,created)=>{
                //                 console.log('created');
                //         })
 
    
})



app.get('/retrieval',(req, res)=>{
    studentModel.find(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    })
    // const data = [{
    //     name: 'Tanner Linsley',
    //     age: 26,
    //     friend: {
    //       name: 'Jason Maurer',
    //       age: 23,
    //     }
    //   },{
    //     name: 'Tysome more',
    //     age: 20,
    //     friend: {
    //       name: 'Jared khan',
    //       age: 21,
    //     }
    //   }]
    // res.send(data);
})
app.get('/todaysAttendance',(req,res)=>{
    const data = {
        'Krimesh':{
            status:'p',
        },
        'prajwal':{
            status:'p'
        }
    }
    res.json(data);
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


