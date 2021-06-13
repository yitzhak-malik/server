const userSchema =require('../schema/userSchema')

function usesrControllers(){
    function questionnaire(req, res){
       userSchema.findById(req.user._id,{role:0,roleNumber:0},function(err,doc){
          if(err){
            res.status(400).send(doc)

          }
          console.log(doc);
        res.status(200).send(doc)

       })


    }
    function upDateQuestionnaire(req,res){
        let upDate={
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
        userSchema.findByIdAndUpdate(req.user._id,upDate,{new:true},function(err,doc){
            if(err){
                res.status(401).send({massege:"err update"})
            }
         if(doc){
            console.log(doc);
            res.status(202).send({massege:'next'})
         }
        

        })


        
    }

    



    return {
        
        questionnaire,
        upDateQuestionnaire
    }
}
module.exports=usesrControllers();