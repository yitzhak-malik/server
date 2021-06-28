
const userSchema =require('../schema/userSchema');
const academicSchema =require('../schema/academicSchema');
const supervisorSchema =require('../schema/supervisorSchema');
const adminSchema =require('../schema/adminSchema');


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
                   
                        return res.status(200).send( {academics:admin.academics.map(data=>nameIs=data.name)} )
                    } 
                    
                }) 
            }

        })
    })
    }
    function createSupervisor(req,res) {
        userSchema.findOne({$or:[{id:req.body.supervisor.id},{phoneNumber:req.body.supervisor.phoneNumber}]},function(err,user){

            if(err){
                return res.status(500).send()
             }
             
             if(user){
               
             return res.status(400).send("User or phone exist")
             }
             if(!user){
                 req.body.supervisor.role='supervisor'
                 req.body.supervisor.roleNumber=200
                
                 newUser=new userSchema(req.body.supervisor)
                 newUser.save(function (err,user) {
                     if(err){
                         return res.status(500).send()
                        }
                     if(user){
                         adminSchema.findById(req.user._idS,function(err,admin){
                            if (err) {
                                return res.status(500).send()
                            }
                             admin.populate('academics',function(err,admin){
                               
                                if (err) {
                                    return res.status(500).send()
                                }
                                if (admin) {
                                  var academics=admin.academics.filter(data=>req.body.arrAcademics.includes(data.name))
                                   for(let academic of academics ) {
                                     academic.supervisors.push(newUser)
                                     academic.save()
                                   }
                                    new supervisorSchema({academics:academics}).save(function (err,newSupervisor) {
                                            
                                    if (err) {
                                        return res.status(500).send()  
                                    }
                                    newUser.typeUser=newSupervisor
                                    newUser.save(); 
                                   return res.status(200).send()
                                })
                             }

                         } )
                         })
                     }
                 })
             }
        })
    }
    function getAllSupervisors(req,res) {
   console.log("s");
       adminSchema.findById(req.user._idS).populate({path:'academics',populate:{path:'supervisors'}})
       .exec((e,r)=>console.log(r.academics.map((data)=>supervisor=data.supervisors).flat()))
        
            
    
    } 
    return{
        createAcademic,
        getAllAcademics,
        createSupervisor
    }
}
module.exports=adminControllers()