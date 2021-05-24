var exspress =require("express");
const loginRoutes = require('../Routers/loginRoutes');
const userSchema =require('../schema/userSchema')
   const loginSchema=require('../schema/loginSchema')
function loginControl(){
    function chekUser(req,res){
       userSchema.findOne({id:req.body.id},function(err,user){
           if(err){
              return res.status(500).send()
           }
           if(user){
            return res.status(500).send("User exist")
           }
           var code="1234"
           newLogin=new loginSchema({id:req.body.id,code:code})
           newLogin.save()
           req.body._id=newLogin._id
           res.status(200).send(req.body)
           
    
       }) 
      
     }

     function chekCode(req,res){
         loginSchema.findOne(req.body,function(err,user){
             if(err){
                return res.status(500).send()
             }
             if(!user){
                 return res.status(401).send("no access")
             }
             newLogin.updata(req.body,{$set:{codeAuth:true}});
             res.status(200).send("codeAuth")

         })
     }

     function imageAuth(req,res){
         if(true){
           var newUser=new userSchema(req.body)
            newUser.save(function(err,user){
                if(err){
                    return res.status(500).send()
                 }
                 if(!user){
                    return res.status(401).send("no access")
                 }
                 
            })
         }
     }
     return{
         chekUser,
         chekCode,
         imageAuth
     }
    
}
module.exports=loginControl()
