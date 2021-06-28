

const userSchema =require('../schema/userSchema')
const loginSchema=require('../schema/loginSchema')
const adminSchema=require('../schema/adminSchema')
const academicSchema=require('../schema/academicSchema')
const supervisorSchema=require('../schema/supervisorSchema')



   function supervisorControl(){
     function getAllAcademics(req,res){
         console.log(req.user._idS);
        supervisorSchema.findById(req.user._idS,(e,m)=>console.log(m))
            supervisorSchema.findById(req.user._idS).populate('academics','name -_id').exec((err,academics)=>{console.log(academics.academics);res.status(200).send(academics.academics)})
     }
    
     return{
        getAllAcademics
     }
    
}
module.exports=supervisorControl()
 