const mongoose= require('mongoose');
const schema = mongoose.Schema;

var routineAttendance = new schema({
    ref_id:{
        type:String,
        required:true
    },
   attendance:{}
},{
        collection: 'attendance7'
})
module.exports= mongoose.model('routineAttendance', routineAttendance)