const express = require('express');
const path = require('path');
const {spawn} = require('child_process');

const app = express();
const port = 5000;


app.listen(port, ()=>{
    console.log("Server Started on port")
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
            "C:/Users/hp/Desktop/Project/Neema/Face-recognition/collection/script.py"
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