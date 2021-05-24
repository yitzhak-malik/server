const express = require('express');
const loginControllers=require('../controlers/loginControl');
const loginRoutes=express.Router();
loginRoutes.post('/chekUser',loginControllers.chekUser);
loginRoutes.get('/:_id',);
loginRoutes.get('/getAll')
loginRoutes.delete('/:_id')

module.exports=loginRoutes;