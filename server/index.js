const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const app=express()
const PORT = 3000
const { mogoUrl } = require('./keys')
require('./models/User')

const requireToken=require('./middleware/requireToken')
const authRoutes=require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)
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
    res.send({name:'success!'})
})


app.post('/',async(req,res)=>{
    console.log(req.body)   
    res.send(req.body)
})









app.listen(PORT,()=>{
    console.log("server running: "+PORT)
})