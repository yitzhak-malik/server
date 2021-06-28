const port=process.env.PORT||8080
var exspress =require("express");
var app=exspress();
const cors=require('cors')
const mongoose= require('mongoose');
const pathDB=process.env.MONGO_URI ||  "mongodb://127.0.0.1:27017/myfirstdatabase"
mongoose.connect(pathDB)
const auth=require('./controlers/apiControl')


app.listen(port);

const userRoutes=require('./Routers/userRoutes');
const loginRoutes=require('./Routers/loginRoutes')
app.use(exspress.json())
app.use(cors())
//app.post('kk',require())
app.use('/auth',loginRoutes)
app.use('/api',auth)
app.use('/api/users',userRoutes);

