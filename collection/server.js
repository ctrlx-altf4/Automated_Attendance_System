const express = require('express');
const path = require('path');
const {spawn} = require('child_process');

const app = express();
const port = process.env.PORT ||5000;

app.use(express.static('collection'));

app.listen(port, ()=>{
    console.log("Server Started on port")
})


app.post('/images',(req,res)=>{
    console.log("yaa aayo hai")
})

app.get('/home', (req, res)=>{
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
        "C:/Users/hp/Desktop/Project/Neema/Face-recognition/etc/EigenFace/make_prediction.py"
        // path.join(__dirname,'script.py'),          
    ]);
    
    }    
    const subprocess = runScript();

    subprocess.stdout.on('data', (data)=>{
        console.log(`data:${data}`);
    });
   
    res.send();
})

app.get('/train',(req,res)=>{
    function runScript(){
        console.log("collect");
        return spawn('python',[
            "-u",
            "C:/Users/hp/Desktop/Project/Neema/Face-recognition/etc/EigenFace/train_model.py"
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