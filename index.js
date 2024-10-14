const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const userRoute=require('./src/Routes/routes');
const bodyparser=require('body-parser');
require('dotenv').config();
const app=express();
const PORT=process.env.PORT || 6500;

const url=process.env.MONGODB_URL;

// console.log(url);

// database connection
mongoose.connect(url,{ }).then(()=>{
   console.log('mongodb is ready to work ')
}).catch((error)=>{
   console.log(`Database is connection failed ${error}`);
})


app.use(cors({
   origin:'http://localhost:3000/',
   method:['GET','PUT','POST','DELETE'],
}))
app.use(bodyparser.json())
app.use('/', userRoute);



// server 
app.listen(PORT,(err)=>{
   if(err){
    console.log(`Server not started Properly ${err}`);
   }
   console.log(`server start on Port ${PORT}`);
})