const mongoose=require('mongoose');
const schema=mongoose.Schema;

var testSchema=new schema({
  testName:String,
  subject:String,
  url:String,
  score:Number,
  role:String,
  isNew:{
    type:Boolean,
    default:true
  },

  date:{
    default:Date.now()
  },
  sender:{type:mongoose.Types.ObjectId,refPeth:'role'}
  
 
})
module.exports = mongoose.model('test',testSchema);
