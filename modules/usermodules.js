const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
  username:{
    type:String,
    unique:true,
    minlength:[3,'at least have the min length 3']
  },
  email:{
    type:String,
    unique:true,
    minlength:[3,'at least have the min length 3']
  },
  password:{
    type:String,
    unique:true,
    minlength:[3,'at least have the min length 3']
  }
})

const usermodel=mongoose.model('usermodel',userschema)


module.exports=usermodel

