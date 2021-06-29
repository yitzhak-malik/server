const express = require('express');
const supervisorControllers=require('../controlers/supervisorControl');
const supervisorRoutes=express.Router();
supervisorRoutes.use('',function(req,res,next){
    req.user.roleNum>=200?next():res.status(400).send('roleNum')
})
supervisorRoutes.get('/getAllAcademics',supervisorControllers.getAllAcademics);
supervisorRoutes.get('/getAllInterns',);
supervisorRoutes.post('/createClass',);
supervisorRoutes.get('/getAllclass',);
supervisorRoutes.post('/createTest',);
supervisorRoutes.post('/getInterns',supervisorControllers.getInterns);
// adminRoutes.delete()
// adminRoutes.get();

module.exports=supervisorRoutes;