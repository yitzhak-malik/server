

const userSchema =require('../schema/userSchema')
const loginSchema=require('../schema/loginSchema')
const adminSchema=require('../schema/adminSchema')
const academicSchema=require('../schema/academicSchema')
const supervisorSchema=require('../schema/supervisorSchema')



   function supervisorControl(){
     function getAllAcademics(req,res){
         console.log(req.user._idS);
            supervisorSchema.findById(req.user._idS).populate('academics','name -_id').exec((err,supervisor)=>{
               if(err){
                  return res.status(500).send()
               }
               res.status(200).send(supervisor.academics)})
     }
    
     return{
        getAllAcademics
     }
    
}
module.exports=supervisorControl()
 