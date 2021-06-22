const mongoose=require('mongoose');
const schema=mongoose.Schema;

var academicSchema=new schema({
  name:String,
  interns:[{type:mongoose.Types.ObjectId,ref:'user'}],
  supervisors:[{type:mongoose.Types.ObjectId,ref:'user'}]

})
module.exports = mongoose.model('academic',academicSchema);
