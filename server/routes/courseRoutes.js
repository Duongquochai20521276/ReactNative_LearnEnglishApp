const express=require('express')
const mongoose = require('mongoose')
const requireToken=require('../middleware/requireToken')

const router=express.Router()

// const User=mongoose.model('User')
const Vocabulary=mongoose.model('Vocabulary')



router.get('/getBasicCourse',requireToken,async (req,res)=>{
    // res.send({name:'success!'})
    const words = await Vocabulary.find({id_course:'basic'})
    
    // const id_course='basic'
    // const word='test2'
    // const main=new Vocabulary({id_course:'basic1',word:'test3'})
    // await main.save()
    res.send(words)
})

router.get('/getAdvanceCourse',requireToken,async (req,res)=>{
    // res.send({name:'success!'})
    const words = await Vocabulary.find({id_course:'advance'})
    
    // const id_course='basic'
    // const word='test2'
    // const main=new Vocabulary({id_course:'basic1',word:'test3'})
    // await main.save()
    res.send(words)
})


// router.post('/getCourse',async(req,res)=>{
//     const {email,password,username}=req.body
//     try{
//         const user=new User({email,password,username})
//         const token=jwt.sign({userid:user._id},jwtkey)
//         await user.save()
//         console.log({token:token,id:user._id})
//         res.send({token:token,id:user._id})
//     }
//     catch(err){
//         res.status(422).send(err.message)
//     }
    

    
// })

// router.post('/signin',async(req,res)=>{
//     const {email,password}=req.body
//     if(!email||!password) {
//         return res.status(422).send({error:'must provide email or password'})
//     }
//     const user = await User.find({email})
    
//     // const user=new User({result.email,password})
//     if(!user) {
//         return res.status(422).send({error:'invalid email'})
//     }
//     try{
        
//         await user[0].comparePassword(password)
//         const token =jwt.sign({userid:user._id},jwtkey)
        
//             res.send({token:token,username:user[0].username})
        
//         // console.log({token:token,username:user})
        
 
//     }catch(err){
//             return  res.status(422).send(err)
//     }
// })

module.exports=router