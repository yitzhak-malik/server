const port=process.env.PORT||8080
var exspress =require("express");
var app=exspress();
const cors=require('cors')
const mongoose= require('mongoose');
const pathDB=process.env.MONGO_URI ||    'mongodb+srv://Izakmalik:0584498641@cluster0.4vufx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' // "mongodb://127.0.0.1:27017/myfirstdatabase"
mongoose.connect(pathDB)
const auth=require('./controlers/apiControl')


app.listen(port);

const userRoutes=require('./Routers/userRoutes');
const loginRoutes=require('./Routers/loginRoutes')
app.use(exspress.json())
app.use(cors())
app.use('/auth',loginRoutes)
app.use('/api',auth)
app.use('/api/users',userRoutes);
app.use('/api/admin',require('./Routers/adminRoutes'));
app.use('/api/supervisor',require('./Routers/supervisorRoutes'));

