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
            age:req.age,
            country:req.country,
            city:req.city,
            graduatiunYear:req.graduatiunYear ,
            academic:req.academic,
            medical:req.medical,
            residency:req.residency,
            yearInResidency:req.yearInResidency,
            department:req.department
           
          
        }
        userSchema.findByIdAndUpdate(req.user._id,upDate,{new:true},function(err,doc){

        console.log(doc);
console.log('hdhfdh');

        })


        
    }

    



    return {
        
        questionnaire,
        upDateQuestionnaire
    }
}
module.exports=usesrControllers();