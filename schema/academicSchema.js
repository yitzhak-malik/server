const mongoose=require('mongoose');
const schema=mongoose.Schema;

var academicSchema=new schema({
  interns:[{type:mongoose.Types.ObjectId,ref:'user'}]
  

})
module.exports = mongoose.model('academic',academicSchema);
