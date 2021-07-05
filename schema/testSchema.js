const mongoose=require('mongoose');
const schema=mongoose.Schema;

var testSchema=new schema({
  testName:String,
  subject:String,
  url:String,
  score:Number,
  role:String,
 New:{
    type:Boolean,
    default:true
  },

  date:{
    type:Date,
    default:Date.now()
  }

    
 
})
module.exports = mongoose.model('test',testSchema);
