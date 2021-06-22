const mongoose=require('mongoose');
const schema=mongoose.Schema;

var adminSchema=new schema({
  
  password:String,
  academics:[{type:mongoose.Types.ObjectId,ref:'academic'}]


})
module.exports = mongoose.model('admin',adminSchema);
