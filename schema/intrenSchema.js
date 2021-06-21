const mongoose=require('mongoose');
const schema=mongoose.Schema;

var internSchema=new schema({
  
    age:{
        type:Number
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    graduatiunYear:{
        type:Number
    },
    academic:{
        type:String
    },
    medical:{
        type:String
    },
    residency:{
        type:String
    },
    yearInResidency:{
        type:Number
    },
    department:{
        type:String
    },
    testGet:[{type:mongoose.Types.ObjectId,ref:'test'}],
    testPost:[{type:mongoose.Types.ObjectId,ref:'test'}]

})
module.exports = mongoose.model('intern',internSchema);
