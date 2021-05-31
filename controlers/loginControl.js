var exspress =require('express');
const useToken=require('../schema/useToken')
const userSchema =require('../schema/userSchema')
   const loginSchema=require('../schema/loginSchema')



   function loginControl(){
       // if user is null 
    function chekUserNoEtxsit(req,res){
        console.log("chekUser");
       userSchema.findOne({id:req.body.id},function(err,user){
           if(err){
               return res.status(404).send()
            }
            
            if(user){
              
            return res.status(400).send("User exist")
           }
           var code="1234"
           newLogin=new loginSchema({code:code})
           newLogin.save(function(err,doco){
               if(err){
                return res.status(500).send()
               }
              
            
               res.status(200).send({_id:doco._id})
           })
         
           
    
       }) 
      
     }

     function chekCode(req,res){
        //  loginSchema.findOne(req.body,function(err,user){
        //      if(err){
        //         return res.status(500).send()
        //      }
        //      if(!user){
        //          return res.status(401).send("no access")
        //      }
   // }) 
             loginSchema.updateOne({_id:req.body._id,code:req.body.code},{$set:{codeAuth:true}},function(err,result){
              if(err){
                return res.status(500).send()
              }
              if(!result.n){
               return res.status(404).send("err not find")
              }
              res.status(201).send({_id:req.body._id}) 

             });
            

        
     }

     function imageAuth(req,res){

        loginSchema.findOne({_id:req.body.auth._id,codeAuth:true},function(err,user){

            if(err){
                return res.status(500).send()
            }
            if(!user){
                return res.status(404).send("err not find")
            }

            if(true){
                userSchema.findOne({id:req.body.user.id},function(err,user){

                    if(err){
                        return res.status(500).send()
                    }
                    if(user){
                        return res.status(404).send("err user find")
                    }
        
                    req.body.user.role='interns'
                    req.body.user.roleNumber=1
                   var newUser=new userSchema(req.body.user)
                    newUser.save(function(err,user){
                        if(err){
                            return res.status(500).send()
                         }
                         if(!user){
                            return res.status(401).send("no access")
                         }
                         res.status(201).send({token:new useToken(true,null,user.fullname,user._id,user.role,user.roleNumber).token}) 
        
                    })
   

                })
              


              }
            
        })
        
     }
     return{
         chekUserNoEtxsit,
         chekCode,
         imageAuth
     }
    
}
module.exports=loginControl()
