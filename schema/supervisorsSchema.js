const mongoose=require('mongoose');
const schema=mongoose.Schema;

var supervisorSchema=new schema({
    academics:{type:mongoose.Types.ObjectId,ref:' academic'},
    interns:{type:mongoose.Types.ObjectId,ref:'user'}
  

})
module.exports = mongoose.model('supervisor',supervisorSchema);
