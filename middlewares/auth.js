const jwt=require('jsonwebtoken')

function auth(req,res,next){
  const token=req.cookies.token;

  if(!token){
    res.json('token are not present')
  }

  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    return next()
  } catch (error) {
    res.json('its not a decoded')
  }

}

module.exports=auth