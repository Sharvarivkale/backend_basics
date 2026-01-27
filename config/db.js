const mongoose=require('mongoose')

function connectiontodb(){
  return mongoose.connect(process.env.mongo_url).then(()=>{
    console.log('connected to db')
  })
}

module.exports=connectiontodb