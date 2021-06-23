var exspress =require('express');
const useToken=require('../schema/useToken')
const userSchema =require('../schema/userSchema')
const loginSchema=require('../schema/loginSchema')
const adminSchema=require('../schema/adminSchema')

const smsVonage=require('../utils/vonage')
const intern=require('../schema/intrenSchema');
const token = require('../utils/token');

   function loginControl(){
       // if user is null 
    function chekUserNoEtxsit(req,res){
        console.log("chekUser ",{id:req.body.id} );
       userSchema.findOne({$or:[{id:req.body.id},{phoneNumber:req.body.phoneNumber}]},function(err,user){
           if(err){
               return res.status(404).send()
            }
            
            if(user){
              
            return res.status(400).send("User or phone exist")
           }else{

            var code="1234"
            newLogin=new loginSchema({code:code,phoneNumber:req.body.phoneNumber})
            newLogin.save(function(err,doco){
                if(err){
                 return res.status(500).send()
                }
               
             
                res.status(200).send({_id:doco._id})
            })
        
            //send api sms
         // smsVonage.request(req,res)
     
           }
         
       }) 
      
     }

     function chekCode(req,res){

             loginSchema.updateOne({_id:req.body._id,code:req.body.code},{$set:{codeAuth:true}},function(err,result){
              if(err){
                return res.status(500).send()
              }
              if(!result.n){
               return res.status(404).send("err not find")
              }
              res.status(201).send({_id:req.body._id}) 

             });

            //true send sms
            
        // smsVonage.check(req,res)
         
     }

     function imageAuth(req,res){

        loginSchema.findOne({_id:req.body.auth._id,phoneNumber:req.body.user.phoneNumber,codeAuth:true},function(err,user){

            if(err){
                return res.status(500).send()
            }
            if(!user){
                return res.status(406).send("err not find")
            }

            if(true){
                userSchema.findOne({id:req.body.user.id},function(err,user){

                    if(err){
                        return res.status(400).send()
                    }
                    if(user){
                        return res.status(404).send("err user find")
                    }
                    
                    req.body.user.role='intern'
                    req.body.user.roleNumber=1
                   var newUser=new userSchema(req.body.user)
                    newUser.save(function(err,user){
                        if(err){
                            return res.status(500).send(err)
                         }
                         if(!user){
                            return res.status(401).send("no access")
                         }
                          let newintern=new intern()
                          newintern.save(function(err,internDoco){
                            if(err){
                                return res.status(400).send(err)
                             }
                             
                              user.typeUser=internDoco;
                              user.save()
                              res.status(201).send({token:new useToken(true,null,user.fullname,user._id,user.role,user.roleNumber).token}) 
                          })
        
                    })
   

                })
              


              }
            
        })
        
     }
     function logIn(req,res){
         userSchema.findOne({$or:[{phoneNumber:req.params.name},{id:req.params.name}]},function(err,doc){
          if(err){
           return res.status(400).send({message:'err'})
          }if(!doc){
            return res.status(401).send({message:'not find user'})
          }
          console.log(doc);
          var code="1234"
          newLogin=new loginSchema({code:code,phoneNumber:doc.phoneNumber})
          newLogin.save(function(err,doco){
              if(err){
               return res.status(500).send()
              }
           
           console.log(doco._id);
              res.status(200).send({_id:doco._id})
          })



         })
        //  console.log(req.params.name);
         
        //  res.status(200).send({user:{_id:'sssss'},intern:{}})

     }
     function checkCodeLogin(req,res){
      console.log(req.body);
        loginSchema.findOne(req.body,function(err,doc){
            if(err){
              return  res.status(402).send({message:'err '})
            }
            if(!doc){
             return   res.status(403).send({message:`code isn't verify`})
            }
            userSchema.findOne({phoneNumber:doc.phoneNumber},function(err,doco){
                if(err){
                    return  res.status(401).send({message:'err user'}) 
                }
                if(!doco){
                    return  res.status(401).send({message:'err user not find'})
                }
               
               doco.token=new useToken(true,null,doco.fullname,doco._id,doco.role,doco.roleNumber).token;
                
               
                res.status(200).send(doco)
                
            })


        })
     }
     function createAdmin(req,res){
         console.log(req);
        req.body.role='admin'
        req.body.roleNumber=400
        req.body.phoneNumber=req.body.id
        req.body.fullName=req.body.id
        req.body.password=token.cryptPassword(req.body.password)
         var user=new userSchema(req.body)
        user.save(function(err,doc){
            if(err){
                console.log(err,"user");
               return res.status(500).send({message:'err'})
            }
           new adminSchema(req.body).save(function(err,admin){
            if(err){
               return res.status(500).send({message:'err admain'})
            }
            doc.typeUser=admin
            user.save()
            console.log(doc);
            res.status(201).send({token:new useToken(true,null,admin.fullname,admin._id,admin.role,admin.roleNumber).token})

           })

         }) 
     }
     function loginAdmin(req,res){
       userSchema.findOne({id:req.body.id},function(err,doc){
           if (err) {
          return  res.status(500).send({message:'err admain'})
           }
           if (!doc) {
          return res.status(400).send({message:'err admain'})
           }
          doc.populate("typeUser",function(err,user){
            if (err) {
                return  res.status(500).send({message:'err admain'})
                 }
                 console.log(user);
                 console.log(token.compare(req.body.password, user.typeUser.password));
             if(token.compare(req.body.password, user.typeUser.password)){
               return res.status(200).send({token:new useToken(true,null,doc.fullname,doc._id,doc.role,doc.roleNumber).token})
             }
             res.status(400).send({message:'err admain'})
          
          })

           
       })
     }
     return{
         chekUserNoEtxsit,
         chekCode,
         imageAuth,
         logIn,
         checkCodeLogin,
         createAdmin,
         loginAdmin
     }
    
}
module.exports=loginControl()
