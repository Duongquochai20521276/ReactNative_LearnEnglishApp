const mongoose=require('mongoose')
const worduserSchema=new mongoose.Schema({
    id_user:{
        type:String,
        required:true
    },
    listname:{
        type:String,
        required:true
    },
    words:{
        type:Array,
        required:true
    },
})


mongoose.model('Worduser',worduserSchema)