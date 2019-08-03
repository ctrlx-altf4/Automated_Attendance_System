const mongoose= require('mongoos');
const schema = mongoose.Schema;

var attendance = new schema({
    date:{
        type: date,
        require:true
    },
    attendance:{
        
    }
})