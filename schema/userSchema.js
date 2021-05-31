const mongoose=require('mongoose');
const schema=mongoose.Schema;

var userSchema=new schema({
    fullName:{
        type:String,
        
    },
    password:{
        type:String

    },
    id:{
        type:String
    },
    phoneNumber:{
        type:Number

    },
    role:{
        type:String
    },
    roleNumber:{
        type:Number
    }
})
module.exports = mongoose.model('user',userSchema);
