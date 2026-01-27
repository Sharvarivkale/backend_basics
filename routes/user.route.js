const express=require('express')
const usermodel=require('../modules/usermodules')
const bcrypt=require('bcrypt')
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken')


const router=express.Router()

// registration page
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register_data',body('email').trim().isEmail(),
 body('password').trim().isLength({min: 6 }),
 body('username').trim().isLength({min: 3 }),
 async (req,res)=>{
  const {email,password,username}=req.body
  const hashpassword=await bcrypt.hash(password,10)
  const user= await usermodel.create({
    email:email,
    username:username,
    password:hashpassword
  })
  res.json(user)
})

// login page
router.get('/login',(req,res)=>{
  res.render('login')
})
router.post('/login_data',
[ body('password').trim().isLength({min: 6 }),
 body('username').trim().isLength({min: 3 })],
 
 async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const {username,password}=req.body

  const userdata=await usermodel.findOne({
    username:username
  })
  if(!userdata){
    return res.status(400).json({
      message:'username or password are become the wrong'
    })
  }
  const isMatch= await bcrypt.compare(password,userdata.password)
  if(!isMatch){
    return res.status(400).json({
      message:'username or password are become the wrong'
    })
  }

  const token=jwt.sign({
    user_id: userdata._id,
   username: userdata.username
  },process.env.JWT_SECRET)

  res.cookie('token',token)

  res.send('Logged in')


 })

module.exports=router