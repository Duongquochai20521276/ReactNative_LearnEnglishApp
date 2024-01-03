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
    console.log(id_user)
    const words = await worduser.find({id_user})
    console.log('empty')
    if(!words) {
        res.send({err:'is empty'})
        console.log('empty')
    }
    
    // const id_course='basic'
    // const word='test2'
    // const main=new Vocabulary({id_course:'basic1',word:'test3'})
    // await main.save()
    res.send(words)
})
 
//truyen vao body listname va words
router.post('/setlist',requireToken,async (req,res)=>{
    try {
        const {listname,words}=req.body
        const id_user=req.id_user
        console.log(id_user)
        let wuser=await worduser.findOne({id_user,listname})
        if(!wuser) {
            wuser=new worduser({id_user,listname,words})
        } else {
            wuser.words=words
        }
        await wuser.save()

        res.send({success:'1'})
    }
    catch(err) {
        console.log('loi wus')
        console.log(err.message)
    }
})






router.post('/deletelist',requireToken,async (req,res)=>{
    try {
        const {listname}=req.body
        const id_user=req.id_user
        console.log(id_user)
        // console.log(id_user)
        await worduser.deleteOne({id_user,listname})
        // if(!wuser) {
        //     wuser=new worduser({id_user,listname,words})
        // } else {
        //     wuser.words=words
        // }
        // await wuser.save()

        // res.send({success:'1'})
    }
    catch(err) {
        console.log('loi wus')
        console.log(err.message)
    }
})



module.exports=router