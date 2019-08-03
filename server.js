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
                    department: req.body.department,
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
})
app.get('/retrieval/:id',(req,res)=>{
    let id =req.params.id;
    studentModel.findById(id, function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    })
})
var data= [{'name': '504','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '501','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '505','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '507','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '506','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '508','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '509','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '510','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '520','status':'P', 'url': {'url1': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-32-975355.png', 'url2': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-064118.png', 'url3': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-186789.png', 'url4': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-435125.png', 'url5': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-532863.png', 'url6': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-609657.png', 'url7': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-690441.png', 'url8': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-782196.png', 'url9': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-33-955732.png', 'url10': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-457388.png', 'url11': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-34-839366.png', 'url12': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-092689.png', 'url13': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-288166.png', 'url14': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-641221.png', 'url15': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-35-874598.png', 'url16': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-062095.png', 'url17': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-159834.png', 'url18': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-240617.png', 'url19': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-318410.png', 'url20': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-400191.png', 'url21': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-491945.png', 'url22': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-578714.png', 'url23': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-734296.png', 'url24': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-36-961687.png', 'url25': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-051448.png', 'url26': 'C:\\Users\\hp\\Desktop\\EigenFace\\tmp\\2019-07-30\\Ashish Paudel\\13-23-37-356631.png'}},
{'name': '521', 'url': {}},
{'name': '522', 'url': {}},
 {'name': '523', 'url': {}}]
// var data = [{'name': '504','status':'P', 'url': {'url1': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-45-241414.png', 'url2': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-45-706185.png', 'url3': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-45-763033.png', 'url4': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-46-452697.png', 'url5': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-46-507551.png', 'url6': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-46-562404.png', 'url7': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-46-623242.png', 'url8': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-46-683083.png', 'url9': 'C:\\Users\\User\\Documents\\Codes\\python\\Machine learning\\Eigenface\\tmp\\2019-07-28\\Pragya\\20-38-46-736937.png'}},
//     {'name':'503','status':'P','url':{'url1':'C:\\url1', 'url2':'C:\\url2'}},
//     {'name':'501','status':'P','url':{'url1':'C:\\url1', 'url2':'C:\\url2'}},
//     {'name':'523','status':'P','url':{'url1':'C:\\url1', 'url2':'C:\\url2'}},
//     {'name':'540','status':'P','url':{'url1':'C:\\url1', 'url2':'C:\\url2'}},
//     {'name':'513','status':'P','url':{'url1':'C:\\url1', 'url2':'C:\\url2'}},
//     {'name':'543','status':'P','url':{'url1':'C:\\url1', 'url2':'C:\\url2'}}];

fs.readFile('2019-07-30.json','utf-8',function(err,data){
    //console.log(data);
})
    
var j;
 data=data.sort(function(a,b){
    return a.name-b.name;
})

var length= data.length;
var s=0;
for(k=501; k<=548; k++){
   if(s<length){
       if(k==data[s].name){
           s++;
       }
       else{
           data.push({'name': k,'status':'A'})
       };
   }
   else{
       data.push({'name':k,'status':'A'})
   };
}

app.get('/todaysAttendance',(req,res)=>{
    
    res.send(data);
})
app.get('/train',(req,res)=>{
    function runScript(){
        console.log("train");
        return spawn('python',[
            "-u",
            "C:/Users/hp/Desktop/Project/Neema/Face-recognition/etc/EigenFace/train_model.py"
            // path.join(__dirname,'script.py'),          
        ])
        
        }    
        const subprocess = runScript();
    
        subprocess.stdout.on('data', (data)=>{
            console.log(`data:${data}`);
        });
       
        res.send();
})

app.get('/predict',(req,res)=>{
   function runScript(){
    console.log("predicting");
    return spawn('python',[
        "-u",
        "C:/Users/hp/Desktop/Project/Neema/Face-recognition/etc/EigenFace/make_prediction.py"        
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


