
const mongoose=require('mongoose')
const schema=mongooose.schema
const userschema =require('../schema/userSchema')
const express=require('express')

testSchema=new schema({
list:[
    {_id:{
        type:mongoose.Types.ObjectId,
        ref:'user'
         },
         fullName:String
}]


})
test= mongoose.model('test',testSchema)




function newTest(req,res){
userschema.findOne({id:req.body},function(err,doc) {
    tester=new testSchema(doc) 
    tester.save(function(err,re){
        
    })
})


}