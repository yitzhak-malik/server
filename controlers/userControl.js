const userSchema =require('../schema/userSchema')

function usesrControllers(){
    function create(req, res){
        var newUser= new userSchema(req.body);
        newUser.save()

       userSchema.
         res.status(200).send()

    }



    return {
        create,
        
    }
}
module.exports=usesrControllers();