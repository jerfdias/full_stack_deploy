const mongoose=require("mongoose");



async function ConectarBanco(){
try {

     await mongoose.connect("mongodb://127.0.0.1:27017/bancouser")

     console.log("conexão com banco de dados mongoose esta ok")
    
} catch (error) {
     console.log("tem alguma coisa errado com a conexao com o banco de dados",error)  
}

   


    
}


module.exports= ConectarBanco;