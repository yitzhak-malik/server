const express = require('express');
const adminControllers=require('../controlers/adminControl');
const adminRoutes=express.Router();
adminRoutes.post('/createAcademic',adminControllers.createAcademic);
// adminRoutes.get()
// adminRoutes.delete()
// adminRoutes.get();

module.exports=adminRoutes;