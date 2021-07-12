

const userSchema =require('../schema/userSchema')
const loginSchema=require('../schema/loginSchema')
const adminSchema=require('../schema/adminSchema')
const academicSchema=require('../schema/academicSchema')
const supervisorSchema=require('../schema/supervisorSchema')
const classSchema=require('../schema/classSchema')
const testSchema = require('../schema/testSchema')



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
         console.log(req.body.name);
         if(!req.body.name){
           return res.status(400).send()
         }
        supervisorSchema.findById(req.user._idS).populate({path:'academics',match:{name:req.body.name},populate:{path:'interns',select:'-_id -typeUser'}})
        .exec((err,supervisor)=>{
            if (err) {
                return res.status(500).send()
               } 
               if(!supervisor.academics[0]){
                  return res.status(400).send()
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
       //console.log('get class',req.body.academic);
        supervisorSchema.findById(req.user._idS).populate({path:'classes',match:{academicName:req.body.academic}}).exec((err,supervisor)=>{
            if(err){
               return res.status(500).send()
            }
            //console.log(supervisor, 'this classes');
            res.status(200).send(supervisor.classes)})
     }


     function createClass(req,res){console.log('hi this creat class');
     if(!req.body.nameClass && !req.body.academic && !req.body.namesInterns[0] ){
        console.log('ksksk');
      return res.status(400).send()
     }
     supervisorSchema.findById(req.user._idS).populate({path:'academics',match:{name:req.body.academic},
      populate:{path:'interns',match:{id:{'$in':req.body.namesInterns}},
      populate:{path:'typeUser'}}}).exec(
        (err,supervisor)=>{
         if(err){
            return res.status(500).send()
         }
         console.log(err,'this is pop of super',supervisor.academics[0].interns);
         var newClass=classSchema({name:req.body.nameClass,academicName:req.body.academic,interns:supervisor.academics[0].interns})
         newClass.save((err,theClass)=>{
            if(err){
               return res.status(500).send()
            }
            
            supervisor.classes.push(theClass)
            supervisor.save((err,f)=>{
        
               supervisor.academics[0].interns.forEach(element => {
                  element.typeUser.classes.push(theClass)
                  element.typeUser.save()
     

            }
            )
            });

            res.status(201).send()   
         }
         ) 
            
        })}

        function createTest(req,res){
           console.log(req.body._idClass);
      classSchema.findById(req.body._idClass,(err,theClass)=>{
         if(err)
        {return res.status(500).send()}
        console.log(req.user,'llll');
       req.body.supervisorName = req.user.fullName
        var test =new testSchema(req.body)
        test.save((err,test)=>{
         if(err)
         {return res.status(500).send()}
         theClass.tests.push(test)
         theClass.save((err,testinclass)=>{
            console.log(testinclass,err);
            res.status(201).send()
         }) 
 
        })
      })
        }
        function getTestOfClass(req,res){
           classSchema.findById(req.body._idClass,{tests:1,_id:0}).populate({path:'tests',populate:{path:'backTest'}}).exec((err,test)=>{
              console.log('test of class',err);
              if(err)
            {return res.status(500).send()}
            if(test && test.tests)
            return res.status(200).send(test.tests)
            else
            res.status(400).send({p:'dfg'})
           })
        }
       function GivingAtestScore(req,res){
           console.log('GivingAtestScore',req.body)
           testSchema.findByIdAndUpdate(req.body._id,{$set:{note:req.body.note,score:req.body.score}},{new:true}).exec((err,result)=>{
            if(err)
            {return res.status(500).send()}
            if(result){
               console.log(result);
               res.status(203).send()
            }  
           })
        }
       
     return{
        getAllAcademics,
        getInterns, 
        getClasses,
        createClass,
        getInternsOfClass,
        createTest,
        getTestOfClass,
        GivingAtestScore
     }
    
}
module.exports=supervisorControl()
 