const express = require('express');
const usesrControllers=require('../controlers/userControl');
const usesrRoutes=express.Router();
usesrRoutes.get('/getQuestionnaire',usesrControllers.questionnaire);
usesrRoutes.get('/:_id');
usesrRoutes.get('/getAll')
usesrRoutes.delete('/:_id')

module.exports=usesrRoutes;