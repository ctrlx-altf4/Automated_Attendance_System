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
    var numImage=Math.min(15,Object.keys(req.body).length);
    var i=1;
                function saveImage(){
                //    let base64Image1 = req.body['user'+i].split(';base64').pop();
                    cloudinary.uploader.upload(req.body["user"+i],{ folder: req.body.id},function(error, result) {
                        // if(i<=5){
                        //     imageDetails['ImageUrl'+i]=result.url
                        //     imageDetails["image_Id"]=result.public_id;
                        //     studentDetails["imageRef"] = imageDetails["image_Id"];
                        //     console.log(result.public_id);
                        // }
                        i=i+1;
                        if (i<=numImage){
                            saveImage();
                        }
                        
                    })
                }
                saveImage();
    // try{
    //     var duplicateChecker ={
    //         ID: req.body.id,
    //     }
    //     // console.log(req.body.lastName);
    //     // console.log(req.body.email);
    //     // console.log(req.body.address);
    //     // console.log(req.body.contact)
    //     // console.log(req.body.department);
    //     imageModel.find({image_Id : duplicateChecker.ID},(err,callback)=>{
    //         //Checking for error
    //         if(err){
    //             res.json({
    //                 err:err,
    //                 message: 'Error in uploading'
    //             })
    //         }
    //         else if(callback.length>=1){
    //             res.json({
    //                 message: 'The data already exists'
    //             })
    //         }
    //         else{
    //             var i=1;
    //             var imageDetails={
    //                 // image_Id:'fuck off'
    //             };
    //             var studentDetails={
    //                 firstName: req.body.firstName,
    //                 lastName: req.body.lastName,
    //                 email: req.body.email,
    //                 contact: req.body.contact,
    //                 address: req.body.address,
    //                 department: req.body.department
    //             }
    //             var numImage=Math.min(15,Object.keys(req.body).length);
    //             function saveImage(){
    //             //    let base64Image1 = req.body['user'+i].split(';base64').pop();
    //                 cloudinary.uploader.upload(req.body["user"+i],{ folder: req.body.id},function(error, result) {
    //                     if(i<=5){
    //                         imageDetails['ImageUrl'+i]=result.url
    //                         imageDetails["image_Id"]=result.public_id;
    //                         studentDetails["imageRef"] = imageDetails["image_Id"];
    //                         console.log(result.public_id);
    //                     }
    //                     i=i+1;
    //                     if (i<=numImage){
    //                         saveImage();
    //                     }
                        
    //                 })

    //                 /* commented only for heroku*/
    //                 // if(i>5){
    //                 //     //  /************ Saving to Database ***************/  //
    //                 //     imageModel.create(imageDetails,(err,created)=>{
    //                 //         console.log('created');
    //                 //         // if(err){
    //                 //         //     res.json({
    //                 //         //         err:err,
    //                 //         //         message: 'Database save garne belaa kataa jhundiyo'
    //                 //         //     })
    //                 //         // }
    //                 //         // else{
    //                 //         //     res.json({
    //                 //         //         create:created,
    //                 //         //         message: "La Database maa ni save vayexa. achchammai vo baa"
    //                 //         //     })
    //                 //         // }
    //                 //     });
    //                 //     studentModel.create(studentDetails,(err,created)=>{
    //                 //             console.log('created');
    //                 //     })
    //                 // }
    //             }
    //              saveImage();
    //             // var tst='user'+1;
    //             // let base64Image1 = req.body[tst].split(';base64').pop();
    //             // // cloudinary.uploader.upload(req.body.user1,function(error, result) {});
    //             // fs.writeFile('images/image1.png',base64Image1,{encoding: 'base64'},function(err){
    //             //     console.log('file 1 created');
    //             // })
    //             // //  res.send('got it');     
    //         }                  
    //     })     
    // } catch(exceptions){
    //     console.log(exceptions);
    // }   
})



app.get('/api/home',(req, res)=>{
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


