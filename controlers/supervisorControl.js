

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

     function getInterns(req,res){
         console.log('kkkk');
        supervisorSchema.findById(req.user._idS).populate({path:'academics',match:{name:req.body.name},populate:{path:'interns',select:'-_id -typeUser'}})
        .exec((err,supervisor)=>{
            if (err) {
                return res.status(500).send()
               }
               res.status(200).send(supervisor.academics[0].interns)
               console.log(supervisor.academics[0].interns,'intern',err)
        })
        

     }


     function getClasses(req,res){
        supervisorSchema.findById(req.user._idS).populate('classes','name').exec((err,supervisor)=>{
            if(err){
               return res.status(500).send()
            }
            res.status(200).send(supervisor.classes)})
     }


     function createClass(req,res){console.log('hi this creat class');
            supervisorSchema.findById(req.user._idS).populate({path:'academics',populate:{path:'interns'}}).exec((err,d)=>console.log(d.academics[0].supervisors))
     }
    
     return{
        getAllAcademics,
        getInterns,
        getClasses,
        createClass,
     }
    
}
module.exports=supervisorControl()
 