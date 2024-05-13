import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'

const app = express()

app.use(cors())
app.use(express.json())

//........................Parte 1 - Configurando...................

app.get('/', (Request, response) => {
    response.status(200)
    .send(JSON.stringify({ Mensagem:'Bem vindo à aplicação'}))
})

//........................Parte 2 - Pessoa Usuária..................................

let usuarios = []
let mensagens = []
let proximoUsuario = 1
let proximaMensagemId = 1
let emailDoUsuarioLogado

app.post('/signup', async (request, response)=> {
    const dado = request.body
    const id = proximoUsuario
    const nomeDoUsuario = dado.nomeUsuario
    const emailDoUsuario = dado.emailUsuario
    const passwordDoUsuario = dado.passwordUsuario

    if(!nomeDoUsuario){
       response.status(400) 
       .send(JSON.stringify({Mensagem:'Por favor, verifique se passou o nome'}))
    }

    if(!emailDoUsuario){
        response.status(400) 
        .send(JSON.stringify({Mensagem:'Por favor, verifique se passou o email'}))
     }

     if(!passwordDoUsuario){
        response.status(400) 
        .send(JSON.stringify({Mensagem:'Por favor, verifique se passou a senha'}))
     }

     if (usuarios.some(usuario =>usuarios.emailDoUsuario === emailDoUsuario)){
        response.status(400)
        .send(JSON.stringify({Mensagem: 'Email já cadastrado, insira outro.'}))
     }

     const senhaCriptografada = await bcrypt.hash(passwordDoUsuario,10)

     console.log('passwordDoUsuario', passwordDoUsuario)
     console.log('Senha criptografada', senhaCriptografada)


     let newUser ={
        id:proximoUsuario,
        nomeDoUsuario:nomeDoUsuario,
        emailDoUsuario:emailDoUsuario,
        passwordDoUsuario:senhaCriptografada
     }

     usuarios.push(newUser)

     proximoUsuario++

     response.status(201)
     .send(JSON.stringify({Mensagem: `Seja bem vindo ${nomeDoUsuario}, Pessoa usúaria registrada com sucesso!`}))
})

app.post('/login', async (request,response)=>{
    const data = request.body 
  
    const email = data.email 
    const senha = data.senha
  
    if(!email){
        response.status(400)
        .send(JSON.stringify({ Mensagem: "Inserir um email válido" }))
    }
  
    if(!senha){ 
        response.status(400)
        .send(JSON.stringify({ Mensagem: "Inserir uma senha válida" }))
    }

    const usuario = usuarios.find(usuario => usuario.emailDoUsuario === email)

    if(!usuario){ 
        response.status(400)
        .send(JSON.stringify({ Mensagem: "Email não encontrado no sistema, verifique ou crie uma conta" }))
    }

    const senhaMatch = await bcrypt.compare(senha, usuario.passwordDoUsuario)

    if(!senhaMatch){    
        response.status(400)
        .send(JSON.stringify({ Mensagem: "Senha não encontrada em nosso banco.Credencial inválida" }))
    }

    emailDoUsuarioLogado = usuario.emailDoUsuario

    response.status(200)
    .send(JSON.stringify({ Mensagem: `Seja Bem-vinda ${usuario.nomeDoUsuario}! Pessoa usúaria logada com sucesso! ` }))

})

//........................Parte 3 - Mensagens..................................

//http://localhost:9999/message
app.post('/message', (request, response) => {
    const dado = request.body

    let title = dado.title
    let description = dado.description
    let id = proximaMensagemId 



    if(!title){
        response.status(400).send('Passe um título de mensagem válido')
    }

    if(!description){
        response.status(400).send('Passe uma descrição válida')
    }

    const usuario = usuarios.find(user => user.emailDoUsuario === emailDoUsuarioLogado)

    if (!usuario) {
        return response.status(404)
        .send({ Mensagem: `Email não encontrado no sistema. Verifique ou crie uma conta.`})
    }

    let newMessage = {
        id: proximaMensagemId,
        title : title,
        description : description,
        userId: usuario.id 
    }
    
    mensagens.push(newMessage)

    proximaMensagemId++

    response.status(201)
    .send({ Mensagem: `Mensagem criada com sucesso!, ${newMessage.title}`})

})

//http://localhost:9999/message/:emailDoUsuario
app.get('/message/:emailDoUsuario', (request, response) => {
    const email  = request.params.emailDoUsuario

    const usuario = usuarios.find(user => user.emailDoUsuario === email)

    if (!usuario) {
        return response.status(404)
        .send({ Mensagem: 'Email não encontrado, verifique ou crie uma conta.'})
    }

    response.status(200)
    .send({
        texto: "Seja bem-vinde!",
        mensagens: mensagens
    })
})

//http://localhost:9999/message/:id
app.put('/message/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const title = request.body.title
    const description = request.body.description
    let posicao = -1

    
    if (!id || isNaN(id)) {
        response.status(400)
        .send({ Mensagem: `Por favor, informe um ID válido da mensagem.`})
    }
    

    //const mensagemExistente = mensagens.find(mensagem => mensagem.id === id)
    posicao = mensagens.findIndex(mensagem => mensagem.id === id)

    if(posicao == -1){
        response.status(400)
        .send({ Mensagem: `Por favor, informe um ID válido da mensagem.`})
    }

    const mensagem = mensagens[posicao]
    mensagem.title = title
    mensagem.description = description
    
    response.status(200)
    .send({ 
        texto: `Mensagem atualizada com sucesso!`,
        mensagem: mensagem
    })
})

//http://localhost:9999/message/:id
app.delete('/message/:id', (request, response) => {
    const id = Number(request.params.id)

    const index = mensagens.findIndex(mensagem => mensagem.id === id)


    if (index === -1) {
        return response.status(404)
        .send({ Mensagem: `Mensagem não encontrada, verifique o identificador em nosso banco.`})
    }

    mensagens.splice(index, 1)

    response.status(200)
    .send({ Mensagem: 'Mensagem apagada com sucesso.'})
})


app.listen(9999, ()=> console.log("Servidor rodando na porta 9999"))