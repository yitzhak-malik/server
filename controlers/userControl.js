const userSchema =require('../schema/userSchema')

function usesrControllers(){
    function create(req, res){
       
        // var newUser= new userSchema(req.body);
        // newUser.save()

    
         res.status(200).send(req.User)

    }

    



    return {
        create,
        
    }
}
module.exports=usesrControllers();