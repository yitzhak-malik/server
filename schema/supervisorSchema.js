const mongoose=require('mongoose');
const schema=mongoose.Schema;

var supervisorSchema=new schema({
    academics:[{type:mongoose.Types.ObjectId,ref:'academic'}],
    classes:[{type:mongoose.Types.ObjectId,ref:'class'}],
  

})
module.exports = mongoose.model('supervisor',supervisorSchema);
 