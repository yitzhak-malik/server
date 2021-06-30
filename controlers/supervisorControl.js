

const userSchema =require('../schema/userSchema')
const loginSchema=require('../schema/loginSchema')
const adminSchema=require('../schema/adminSchema')
const academicSchema=require('../schema/academicSchema')
const supervisorSchema=require('../schema/supervisorSchema')
const classSchema=require('../schema/classSchema')



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
     
     function getInternsOfClass(req,res){
      console.log('getInternsOfClass',req.body._id);
     classSchema.findById(req.body._id).populate({path:'interns',select:'-_id -typeUser'})
     .exec( function(err,isClass){
         if (err) {
             return res.status(500).send()
            }
            console.log(isClass.interns,'is getInternsOfClass')
            res.status(200).send(isClass.interns)
     })
     

  }



     function getClasses(req,res){
        console.log('get class',req.body.academic);
        supervisorSchema.findById(req.user._idS).populate({path:'classes',match:{academicName:req.body.academic}}).exec((err,supervisor)=>{
            if(err){
               return res.status(500).send()
            }
            console.log(supervisor, 'this classes');
            res.status(200).send(supervisor.classes)})
     }


     function createClass(req,res){console.log('hi this creat class');
     
     supervisorSchema.findById(req.user._idS).populate({path:'academics',match:{name:req.body.academic}, populate:{path:'interns',match:{id:{'$in':req.body.namesInterns}}}}).exec(
        (err,supervisor)=>{
         if(err){
            return res.status(500).send()
         }
         var newClass=classSchema({name:req.body.nameClass,academicName:req.body.academic,interns:supervisor.academics[0].interns})
         newClass.save((err,theClass)=>{
            if(err){
               return res.status(500).send()
            }
            console.log(theClass,'this is class');
            supervisor.classes.push(theClass)
            supervisor.save()

            res.status(201).send()
         }
         ) 
           
        })}
      
     return{
        getAllAcademics,
        getInterns, 
        getClasses,
        createClass,
        getInternsOfClass
     }
    
}
module.exports=supervisorControl()
 