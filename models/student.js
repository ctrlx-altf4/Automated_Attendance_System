const mongoose = require('mongoose');
const schema = mongoose.Schema;

var student = new schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    imageRef:{
        type:String,
        required:true
    }
},{
    collection: 'Students'
}
)

module.exports= mongoose.model('student', student)