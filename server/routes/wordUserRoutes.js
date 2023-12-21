const express=require('express')
const mongoose = require('mongoose')
const requireToken=require('../middleware/requireToken')

const router=express.Router()

// const User=mongoose.model('User')
const worduser=mongoose.model('Worduser')


//khong can truyen gi het. tra ve mot mang chua listname va words
router.post('/getlist',requireToken,async (req,res)=>{
    
    // res.send({name:'success!'})
    const id_user=req.id_user
    const words = await worduser.find({id_user})
    if(!words) {
        res.send('is empty')
    }
    
    // const id_course='basic'
    // const word='test2'
    // const main=new Vocabulary({id_course:'basic1',word:'test3'})
    // await main.save()
    res.send(words)
})

//truyen vao body listname va words
router.post('/setlist',requireToken,async (req,res)=>{
    const {listname,words}=req.body
    const id_user=req.id_user
    let wuser=await worduser.findOne({id_user,listname})
    if(!wuser) {
        wuser=new worduser({id_user,listname,words})
        console.log(wuser)
    } else {
        wuser.words=words
    }
    await wuser.save()

    res.send('success')
})



module.exports=router