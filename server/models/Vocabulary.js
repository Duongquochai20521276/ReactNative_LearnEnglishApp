const mongoose=require('mongoose')

const wordSchema=new mongoose.Schema({
    id_course:{
        type:String,
        required:true
    },
    word:{
        type:String,
        required:true
    },
})


mongoose.model('Vocabulary',wordSchema)