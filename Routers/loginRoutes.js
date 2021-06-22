const express = require('express');
const loginControllers=require('../controlers/loginControl');
const loginRoutes=express.Router();
loginRoutes.post('/chekUser',loginControllers.chekUserNoEtxsit);
loginRoutes.post('/chekCode',loginControllers.chekCode);
loginRoutes.post('/imageAuth',loginControllers.imageAuth);
loginRoutes.post('/chekCodeForLogin',loginControllers.checkCodeLogin);
loginRoutes.get('/logIn/:name',loginControllers.logIn);
loginRoutes.post('/createAdmain')
loginRoutes.delete('/:_id')

module.exports=loginRoutes;