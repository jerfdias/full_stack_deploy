


const mongoose=require("mongoose")



const usuarioSchema=new mongoose.Schema({

    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    senha:{
        type:String,
        required:true
    }
});


const Usuario=mongoose.model("usuario",usuarioSchema)


module.exports = Usuario;