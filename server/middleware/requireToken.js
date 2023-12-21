const jwt=require('jsonwebtoken')
const mongoose = require('mongoose')
const User=mongoose.model('User')
const {jwtkey}=require('../keys')
 
module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization) {
        
        return res.status(401).send({error:"you must be logged"})
    }
    const token=authorization.replace("Beaer ","");
    jwt.verify(token,jwtkey,async (err,payload)=>{
        if(err){
            return res.status(401).send({error:"you must be logged in"})
        }
        const {userid}=payload;
        const user =await User.findById(userid)
        req.user=user
        req.id_user=userid
        next()
    })
}