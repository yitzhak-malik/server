const mongoose=require('mongoose');
const schema=mongoose.Schema;

var loginSchema=new schema({
  
    code:{
        type:String

    },
    codeAuth:{
        type:Boolean,
        default:false
    },
     phoneNumber:{
        type:String

    }

})
module.exports = mongoose.model('login',loginSchema);
