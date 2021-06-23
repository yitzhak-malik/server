const { findById } = require('../schema/userSchema')
const userSchema =require('../schema/userSchema')
const academicSchema =require('../schema/academicSchema')

function adminControllers(){

    function createAcademic(req,res){

        userSchema.findById(req.user._id,function(err,user){
            if(err){
                return res.status(500).send()
            }
            if(!user){
                return res.status(400).send("err not find")
            }
            user.populate('typUser',function(err,admin){
            if(err){
                return res.status(500).send()
            }
            academicSchema.findOne(req.body,function(err,doc){
                if(err){
                    return res.status(500).send()
                }
                if(doc){
                    return res.status(400).send("err  find")
                }
                var academic= new academicSchema(req.body)
                academic.save(function(err,doc){
                    if(err){
                        return res.status(500).send()
                    }
                    admin.typeUser.name=doc
                    admin.save()
                })
            })
          
            })


        })
    }
    return{
        createAcademic
    }
}
module.exports=adminControllers()