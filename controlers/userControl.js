const userSchema =require('../schema/userSchema')

function usesrControllers(){
    function questionnaire(req, res){
       
        // var newUser= new userSchema(req.body);
        // newUser.save()

    
         res.status(200).send({age:999})

    }

    



    return {
        
        questionnaire
    }
}
module.exports=usesrControllers();