const userSchema =require('../schema/userSchema')
const academicSchema =require('../schema/academicSchema')


function usesrControllers(){
    function getQuestionnaire(req, res){
       userSchema.findById(req.user._id,function(err,doc){
          if(err){
           return res.status(500).send(doc)

          }
          doc.populate('typeUser',function(err,pop){
            if(err){
               return res.status(500).send(doc)
            }
            console.log(pop,'information');
            res.status(200).send(pop.typeUser)
    
          })
       
       })


    }
    function upDateQuestionnaire(req,res){
        var upDate={
            age:req.body.age,
            country:req.body.country,
            city:req.body.city,
            graduatiunYear:req.body.graduatiunYear ,
            academic:req.body.academic,
            medical:req.body.medical,
            residency:req.body.residency,
            yearInResidency:req.body.yearInResidency,
            department:req.body.department
           
          
        }
         console.log(upDate);
        
        userSchema.findById(req.user._id,function(err,user){
            if(err){
                
                res.status(500).send({massege:"err update 2"})
            }
            if(upDate.academic){
                academicSchema.findOne({name:upDate.academic},function(err,academic){
                    academic.interns.push(user)
                    academic.save()
                })
               }
            user.populate('typeUser',function(err,pop){
             if(err){
                
                res.status(500).send({massege:"err update 2"})
               }
             
               pop.typeUser.overwrite(upDate).save(function(err,pop){
                   if(err){
                    
                    res.status(500).send({massege:"err update 3"})
                   }
                   if(pop){
                    console.log(pop,'this pop');
                    console.log(user);
                   
                    res.status(202).send({massege:'next'})
                   }
                  
               }) 
               
            })
        })
        // userSchema.findByIdAndUpdate(req.user._id,upDate,{new:true},function(err,doc){
        //     if(err){
        //         res.status(401).send({massege:"err update"})
        //     }
        //  if(doc){
        //     console.log(doc);
        //     res.status(202).send({massege:'next'})
        //  }
        

        // })


        
    }
    function getAllAcademics(req,res) {
        console.log('getAllAcademics');
        academicSchema.find({},{name:1,_id:0},(err,result)=>{
            if(err){
                console.log(err);
              return res.status(500).send()
            }
            console.log(result);
            res.status(200).send(result)
        })
    }

    



    return {
        
        getQuestionnaire,
        upDateQuestionnaire,
        getAllAcademics
    }
}
module.exports=usesrControllers();