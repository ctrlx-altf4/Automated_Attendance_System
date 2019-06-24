const mongoose = require('mongoose');
const schema = mongoose.Schema;

var imageInfo = new schema({
    image_Id:{
        type:String,
        required:true
    },
    ImageUrl1:{
        type:String,
        require:true
    },
    ImageUrl2:{
        type:String,
        require:true
    },
    ImageUrl3:{
        type:String,
        require:true
    },ImageUrl4:{
        type:String,
        require:true
    },
    ImageUrl5:{
        type:String,
        require:true
    },
},{
    collection:'omages'
}
)

module.exports= mongoose.model('imageInfo', imageInfo)