const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const app=express()
const PORT = 3000
const { mogoUrl } = require('./keys')
require('./models/User')
require('./models/Vocabulary')
require('./models/Worduser')

const requireToken=require('./middleware/requireToken')
const authRoutes=require('./routes/authRoutes')
const courseRoutes=require('./routes/courseRoutes')
const wordUserRoutes=require('./routes/wordUserRoutes')
app.use(bodyParser.json())
app.use(authRoutes)
app.use(courseRoutes)
app.use(wordUserRoutes)
mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb')
})


mongoose.connection.on('error',(err)=>{
    console.log('connecting to mongodb is failed: ', err)
})

app.get('/',(req,res)=>{
    res.send({name:'success!1'})
})



app.post('/',requireToken,async(req,res)=>{
    // console.log(req)
    res.send({hi:'cuscess'})
})









app.listen(PORT,()=>{
    console.log("server running: "+PORT)
})