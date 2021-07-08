const mongoose=require('mongoose');
const schema=mongoose.Schema;

var testSchema=new schema({
  testName:String,
  subject:String,
  url:String,
  score:Number,
  name:String,
  id:String,
 New:{
    type:Boolean,
    default:true
  },

  date:{
    type:Number,
    default:Date.now()
  },
  backTest:[{type:mongoose.Types.ObjectId,ref:'test'}]

    
 
})
module.exports = mongoose.model('test',testSchema);
