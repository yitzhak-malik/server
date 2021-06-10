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
    }, age:{
        type:Number
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    graduatiunYear:{
        type:Number
    },
    academic:{
        type:String
    },
    medical:{
        type:String
    },
    residency:{
        type:String
    },
    yearInResidency:{
        type:Number
    },
    department:{
        type:String
    }

})
module.exports = mongoose.model('user',userSchema);
