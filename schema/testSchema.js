const mongoose=require('mongoose');
const schema=mongoose.Schema;

var testSchema=new schema({
  testName:String,
  subject:String,
  url:String,
  score:Number,
  isNew:{
    type:Boolean,
    default:true
  },

  date:{
    default:new date.now()
  },
  supervisor:{type:mongoose.Types.ObjectId,ref:'user'},
  intern:{type:mongoose.Types.ObjectId,ref:'user'}
 
})
module.exports = mongoose.model('test',testSchema);
