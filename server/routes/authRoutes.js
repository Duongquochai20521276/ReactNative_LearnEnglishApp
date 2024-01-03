const express=require('express')
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const {jwtkey} =require('../keys')
const router=express.Router()

const User=mongoose.model('User')

router.post('/signup',async(req,res)=>{
    const {email,password,username}=req.body
    try{
        const user=new User({email,password,username})
        const token=jwt.sign({userid:user._id},jwtkey)
        await user.save()
        console.log({token:token,id:user._id})
        res.send({token:token,id:user._id})
    }
    catch(err){
        res.status(422).send({er:err.message})
    }
    

    
})

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password) {
        return res.status(422).send({error:'must provide email or password'})
    }
    const user = await User.find({email})
    
    // const user=new User({result.email,password})
    if(!user) {
        return res.status(422).send({error:'invalid email'})
    }
    try{
        
        await user[0].comparePassword(password)
        const token =jwt.sign({userid:user[0]._id},jwtkey)
        console.log(token)
            res.send({token:token,username:user[0].username})
        // console.log({token:token,username:user})
        
 
    }catch(err){
            return  res.status(422).send({er:err.message})
    }
})

module.exports=router