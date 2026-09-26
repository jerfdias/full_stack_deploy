const express=require("express");
const cors=require("cors");
const app=express();
const bcrypt=require("bcrypt");
const Usuario=require("./models/usuario");
const ConectarBanco=require("./conectiondb");
const ConectarCloud=require ("./conectioncloud");
const port=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.get('/teste',(req,res)=>{
    res.json({mensagem:"servidor correto"})
})



app.get('/usuarios',async(req,res)=>{

const usuario=await Usuario.find()
     .select("-senha");

res.json(usuario);


});
app.post('/usuarios',async(req,res)=>{

   const{nome,email,senha}=req.body;
   if(
      !nome?.trim() ||
      !email?.trim() ||
      !senha?.trim()
   )
   {
    return res.status(400).json({mensagem:"preencha todos os campos"})
   }
 

   const EmailDuplicado=await Usuario.findOne({email});
   if(EmailDuplicado){
    return res.status(409).json({mensagem:"esse email ja existente!!"});
   }




   const senhaHash=await bcrypt.hash(senha, 10);

   const novoUsuario=await Usuario.create({
    nome,
    email,
    senha:senhaHash
   })

   
res.status(201).json({mensagem:"usuario cadastrado com sucesso",usuario:{
    id:novoUsuario.id,
    nome:novoUsuario.nome,
    email:novoUsuario.email

}})




});

app.post('/login',async(req,res)=>{


    const{email,senha}=req.body;
    const usuario=await Usuario.findOne({email})

    if(!usuario){
        return res.status(401).json({
            mensagem:"email ou senha incorreta"
        })
    }

const senhaCorreta = await bcrypt.compare(
    senha,
    usuario.senha
)
if(!senhaCorreta){
    return res.status(401).json({mensagem:"email ou senha incorreta"})

}
    res.json({mensagem:"login realizado com sucesso"})




});


app.put('/usuarios/:id',async(req,res)=>{


    const id= req.params.id;

    const{nome,email,senha}=req.body;
    const senhaHash=await bcrypt.hash(senha, 10)
    const usuario=await Usuario.findByIdAndUpdate(
        id,{
            nome,
            email,
            senha:senhaHash

    },

    {
        new:true
    }

);
if(!usuario){
    return res.status(404).json({
    mensagem:"usuario nao encontrado"
    })
}

res.json({mensagem:"usuario atualizado com sucesso"})


});





app.delete('/usuarios/:id',async(req,res)=>{


    const id=req.params.id;

    const usuario = await Usuario.findByIdAndDelete(id);

     if(!usuario){
        return res.status(404).json({mensagem:"usuario nao encontrado"})
     }


     res.json({mensagem:"usuario excluido com sucesso "})



});



ConectarCloud().then(()=>{

app.listen(port,()=>{
    console.log(`o servidor esta rodando na porta ${port}`)
});


});



