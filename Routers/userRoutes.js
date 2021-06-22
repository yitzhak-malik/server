const express = require('express');
const usesrControllers=require('../controlers/userControl');
const usesrRoutes=express.Router();
usesrRoutes.get('/getQuestionnaire',usesrControllers.getQuestionnaire);
usesrRoutes.put('/updateQuestionnaire',usesrControllers.upDateQuestionnaire);
usesrRoutes.get('/d')
usesrRoutes.delete('/:_id')

module.exports=usesrRoutes;