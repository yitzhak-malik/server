const mongoose=require('mongoose');
const schema=mongoose.Schema;

var testSchema=new schema({
  testName:String,
  internName:String,
  supervisorName:String,
  subject:String,
  url:String,
  score:Number,
  id:String,
  note:String,
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
