const express = require('express');
const adminControllers=require('../controlers/adminControl');
const adminRoutes=express.Router();
adminRoutes.use('',function(req,res,next){
    req.user.roleNum>=400?next():res.status(400).send('roleNUm')
})
adminRoutes.post('/createAcademic',adminControllers.createAcademic);
 adminRoutes.get('/getAllAcademic',adminControllers.getAllAcademics)
// adminRoutes.delete()
// adminRoutes.get();

module.exports=adminRoutes;