const express=require('express')
const router=express.Router()
const middleware=require('../middlewares/auth')

router.get('/home',middleware,(req,res)=>{
  res.render('home')
})

module.exports=router