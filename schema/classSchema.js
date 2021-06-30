const mongoose=require('mongoose');
const schema=mongoose.Schema;

var classSchema=new schema({
  name:String,
  academicName:String,
  interns:[{type:mongoose.Types.ObjectId,ref:'user'}]

})
module.exports = mongoose.model('class',classSchema);
