const mongoose=require('mongoose');
const schema=mongoose.Schema;

var testSchema=new schema({
  score:Number,
  nameTeacher:String,
  

})
module.exports = mongoose.model('test',testSchema);
