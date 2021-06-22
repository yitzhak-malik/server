const mongoose=require('mongoose');
const schema=mongoose.Schema;

var userSchema=new schema({
    fullName:{
        type:String,
        required: true, 
        
    },
    passport:{
        type:String

    },
    id:{
        type:String,
        required: true, 
        unique: true 
    },
    phoneNumber:{
        type:String, 
        required: true, 
        unique: true 

    },
    role:{
        type:String
    },
    roleNumber:{
        type:Number
    },
    token:{
        type:String
    },
    typeUser:{type:mongoose.Types.ObjectId,refPath:'role'}
   
    

})
module.exports = mongoose.model('user',userSchema);
