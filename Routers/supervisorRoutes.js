const express = require('express');
const supervisorControllers=require('../controlers/supervisorControl');
const supervisorRoutes=express.Router();
supervisorRoutes.use('',function(req,res,next){
    req.user.roleNum>=200?next():res.status(400).send('roleNum')
})
supervisorRoutes.get('/getAllAcademics',supervisorControllers.getAllAcademics);
supervisorRoutes.get('/getAllInterns',);
supervisorRoutes.post('/getClasses',supervisorControllers.getClasses,);
supervisorRoutes.post('/createClass',supervisorControllers.createClass);
supervisorRoutes.post('/getInterns',supervisorControllers.getInterns);
supervisorRoutes.post('/getInternsOfClass',supervisorControllers.getInternsOfClass);
supervisorRoutes.post('/createTest',supervisorControllers.createTest);
// adminRoutes.delete()
// adminRoutes.get();

module.exports=supervisorRoutes;