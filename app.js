const express=require('express')
const app=express()
const userroutes=require('./routes/user.route')
const indexroutes=require('./routes/index.routes')
const dotenv=require('dotenv')
const cookieparser=require('cookie-parser')
dotenv.config()
const connectiontodb=require('./config/db')
connectiontodb();

app.use(cookieparser())
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',indexroutes)
app.use('/user',userroutes)


app.listen(3000)