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
            user.populate('typeUser',function(err,admin){
            if(err){
                return res.status(500).send()
            }
            academicSchema.findOne(req.body,function(err,doc){
                if(err){
                    return res.status(500).send()
                }
                if(doc){
                    return res.status(400).send("err find")
                }
                var academic= new academicSchema(req.body)
                academic.save(function(err,doc){
                    if(err){
                        return res.status(500).send()
                    }
                    admin.typeUser.academics.push(doc)
                   
                     admin.typeUser.save((err,j)=>{console.log(err,j);})
                    res.status(200).send()
                })
            })
          
            })


        })
    }
    function getAllAcademics(req,res){
        
        userSchema.findById(req.user._id,function (err,doc) {
            // console.log(doc);
        doc.populate('typeUser',function(err,user){
            // console.log(user);
            if(err){
                return res.status(500).send()
            }if (user) {
                user.typeUser.populate({path:'academics'},function(err,admin){
                    if(err){
                        return res.status(500).send()
                    }
                    if (admin) {
                        return res.status(500).send()
                    } 
                }) 
            }

        })
    })
    }
    return{
        createAcademic,
        getAllAcademics
    }
}
module.exports=adminControllers()