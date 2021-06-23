const express = require('express');

const loginControllers=require('../controlers/loginControl');
const loginRoutes=express.Router();
loginRoutes.post('/chekUser',loginControllers.chekUserNoEtxsit);
loginRoutes.post('/chekCode',loginControllers.chekCode);
loginRoutes.post('/imageAuth',loginControllers.imageAuth);
loginRoutes.post('/chekCodeForLogin',loginControllers.checkCodeLogin);
loginRoutes.get('/logIn/:name',loginControllers.logIn);
loginRoutes.post('/admin/create',loginControllers.createAdmin)
loginRoutes.post('/admin/login',loginControllers.loginAdmin)
loginRoutes.delete('/:_id')

module.exports=loginRoutes;