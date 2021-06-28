const express = require('express');
const usersControllers=require('../controlers/userControl');
const usersRoutes=express.Router();

usersRoutes.get('/getQuestionnaire',usersControllers.getQuestionnaire);
usersRoutes.put('/updateQuestionnaire',usersControllers.upDateQuestionnaire);
usersRoutes.get('/getAllAcademics',usersControllers.getAllAcademics)

module.exports=usersRoutes;