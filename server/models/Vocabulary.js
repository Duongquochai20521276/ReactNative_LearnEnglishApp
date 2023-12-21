const mongoose=require('mongoose')

const wordSchema=new mongoose.Schema({
    id_course:{
        type:String,
        unique:true,
        required:true
    },
    words:{
        type:Array,
        required:true
    },
})


mongoose.model('Vocabulary',wordSchema)