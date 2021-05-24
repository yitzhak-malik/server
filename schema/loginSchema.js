const mongoose=require('mongoose');
const schema=mongoose.Schema;

var loginSchema=new schema({
    id:{
        type:String,
        
    },
    code:{
        type:String

    },
    codeAuth:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('login',loginSchema);
