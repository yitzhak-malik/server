const mongoose=require('mongoose');
const schema=mongoose.Schema;

var classSchema=new schema({
  name:String,
  academicName:String,
  interns:[{type:mongoose.Types.ObjectId,ref:'user'}],
  tests:[{type:mongoose.Types.ObjectId,ref:'test'}]
})
module.exports = mongoose.model('class',classSchema);
