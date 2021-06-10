const express = require('express');
const usesrControllers=require('../controlers/userControl');
const usesrRoutes=express.Router();
usesrRoutes.get('/getQuestionnaire',usesrControllers.questionnaire);
usesrRoutes.put('/updateQuestionnaire',usesrControllers.upDateQuestionnaire);
usesrRoutes.get('/getAll')
usesrRoutes.delete('/:_id')

module.exports=usesrRoutes;