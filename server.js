const express = require('express');
const path = require('path');
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
var Promise = require('promise');

//-------------------------Database Setup-----------------------------
const mongoose = require('mongoose');
const db = require('./config/db');

//importing model 
const studentModel = require('./models/student');
const routineAttendanceModel = require('./models/routineAttendance');
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
    var numImage=Math.min(15,Object.keys(req.body).length-7);
    console.log(numImage);
    var i=1;
    function saveImage(){
        let base64Image = req.body["user"+i].split(';base64').pop();
        var dir = './images/'+ req.body.rollNo;
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
    saveImage()
                var i=1;
                var studentDetails={
                    rollNo: req.body.rollNo,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    contact: req.body.contact,
                    address: req.body.address,
                    department: req.body.department,
                }

const StudentModel = new studentModel(studentDetails);
StudentModel.save();
    
})


//Students data pathaauxa esle
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

//individual student detail pathaauxa esle
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


/*============================================================================================
to connect the received roll no from machine learning to its database information
============================================================================================*/
let data;
var id;
function run(id,call){
    try{
        // let today = new Date();
        // var date = today.getFullYear()+'-'+ ("0"+(today.getMonth()+1)).slice(-2)+'-'+("0"+today.getDate()).slice(-2);
        // console.log(date);
        if(fs.existsSync('C:/Users/hp/Desktop/Project/Neema/Face-recognition/client/tmp/json/'+id+'.json')){
            //nameFinder of received attendee list
            var name = [];
    
            function nameFinder(studentModel, value,index, callback){
                studentModel.find({ rollNo: value}, function(err,result){
                    if (err) {
                        console.log(err);
                    } 
                    name[0]= result;
                    if(index===null){
                        data.push({'name': value,'status':'A','firstName':name[0][0].firstName+' '+name[0][0].lastName,'ref_id':name[0][0]._id})
                    }
                    else{
                        data[index].firstName = name[0][0].firstName+ ' '+ name[0][0].lastName;
                       data[index].ref_id =name[0][0]._id;
                    }
                   
                    callback();
                    if(value==547){
                        call();
                    }
                });
            }
    
            let str=fs.readFileSync('C:/Users/hp/Desktop/Project/Neema/Face-recognition/client/tmp/json/'+id+'.json','utf-8')
            let obj = str.replace(/\'/g,'"');
            data = JSON.parse(obj);
            data=data.sort(function(a,b){
                return a.name-b.name;
            })
            
            var length= data.length;
            var s=0;
            for(k=501; k<=548; k++){
            if(s<length){
                if(k==data[s].name){
                    // data.splice(0,1);
                    nameFinder(studentModel,k,s, function(){
                        
                    });
                    s++;
                }
                else{  
                    nameFinder(studentModel,k,null, function(){
                        
                     });
                    
                    // data.push({'name': k,'status':'A'})
                };
            }
            else{
                nameFinder(studentModel,k,null, function(){
                    
                });
               
            };
            
        }
        }
        else{
            console.log("new file not created")
        }
    }
    catch(err){
        console.error(err);
    }
}

/*============================================================================================*/


app.get('/todaysAttendance/:id',(req,res)=>{
    console.log("todays")
    run(req.params.id,function(){
        res.json(data);
    })
    
})




app.post('/verifiedData',(req,res)=>{
    console.log(req.body);
    let verifiedData= req.body;
    verifiedData = verifiedData.sort(function(a,b){
        return a.name-b.name;
    });
    var RoutineAttendanceModel = new routineAttendanceModel({ref_id:date, attendance:verifiedData});
    RoutineAttendanceModel.markModified('ref_id')
        RoutineAttendanceModel.markModified('attendance')
        RoutineAttendanceModel.save(function(err,result){
            if(err) console.log(err);
    })   
})


let indiAttendance=[];
function attendanceKeeper(routineAttendanceModel, i,j, callback){
    
    routineAttendanceModel.find({ref_id:'2019-08-0'+i}, function(err,result){
        if(err){
    
        }
        if(!result.length)
        {
            console.log('no data')
        }
        else{
            indiAttendance[j]['attendance'].push({'Date':result[0].ref_id,
            'status': result[0].attendance[j].status});
            console.log(j+'=>'+result[0].ref_id+" => "+result[0].attendance[j].status);
        }
      callback();
        
    })
}
for(j=0;j<48;j++){
    indiAttendance.push({rollNo:j+501})
    indiAttendance[j]['attendance']=[];
    for(i=0;i<=30; i++){
        attendanceKeeper(routineAttendanceModel,i,j, function(){          
        });
    }
}

app.get('/indiAttendance',(req,res)=>{
    res.json(indiAttendance);
})






/*===============================================
        ML-Application interaciton
===============================================*/
app.get('/train',(req,res)=>{
    function runScript(){
        console.log("train");
        return spawn('python',[
            "-u",
            "C:/Users/hp/Desktop/Project/Neema/Face-recognition/etc/EigenFace/train_model.py"      
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
        // if(data=='prediction complete'){
        //     console.log('yay');
        //     // res.send('complete vayexa');
        // }
        console.log(`data:${data}`);
    });
    res.send();
   
})