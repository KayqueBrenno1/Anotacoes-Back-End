/*************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto Whatsapp
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 10/04/2026 - 13/04/2026
 * Versão: 1.0
 ************************************************************************/

//Import das dependências para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configurações no cors da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET',
    allowedHeaders: ['Content-type', 'Authorization'],
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const whatsapp = require('./modulo/funcoes.js')

//                     ENDPOINTS
//Listar todas as rotas
app.get('/v1/whatsapp/help', function (request, response) {
    let docAPI = {
        "api-description": "API para manipular dados de Estados e Cidades",
        "date": "2026-04-02",
        "development": "Kayque Brenno Ferreira Almeida",
        "version": 1.0,
        "endpoints": [
            {
                "router1": "/v1/whatsapp/dados/usuarios",
                "description": "Lista todos os usuários e seus dados"
            },
            {
                "router2": "/v1/whatsapp/dados/usuario/11987876567",
                "description": "Lista os dados de apenas um usuário"
            },
            {
                "router3": "/v1/whatsapp/dados/contatos/11987876567",
                "description": "Lista os dados dos contatos do usuário"
            },
            {
                "router4": "/v1/whatsapp/usuario/11987876567/mensagens",
                "description": "Lista todas as mensagens do usuário"
            },
            {
                "router5": "/v1/whatsapp/usuario/11987876567/conversas?contato=Ana%20Maria",
                "description": "Lista a conversa de um usuário com um contato específico, colocando o nome do contato via query(?contato='Nome do contato')"
            },
            {
                "router6": "/v1/whatsapp/usuarios/11987876567/conversas/filtro?contato=Ana%20Maria&busca=hello",
                "description": "Busca nas mensagens do usuário uma palavra específica, informando o nome do contato e a palavra via query(?contato='Nome do contato'&busca='Palavra chave')"
            }
        ]
    }

    response.json(docAPI)
    response.status(200)
})

//Listar todos os dados de todos os usuários
app.get('/v1/whatsapp/dados/usuarios', function (request, response) {
    let usuarios = whatsapp.getListaTodosUsuario()

    response.status(200)
    response.json(usuarios)
})

//Listar os dados do usuário com base no número do whatsapp
app.get('/v1/whatsapp/dados/usuario/:numero', function (request, response) {
    let numero = request.params.numero
    let usuario = whatsapp.getDadosUsuario(numero)

    if (usuario) {
        response.status(200)
        response.json(usuario)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum número de usuário encontrado" })
    }
})

//Listar os contatos do usuário
app.get('/v1/whatsapp/dados/contatos/:numero', function (request, response) {
    let numero = request.params.numero
    let contatos = whatsapp.getDadosContatos(numero)

    if (contatos) {
        response.status(200)
        response.json(contatos)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum número de usuário encontrado" })
    }
})

//Listar todos os contatos com as conversas de um determinado usuário
app.get('/v1/whatsapp/usuario/:numero/mensagens', function (request, response) {
    let numero = request.params.numero
    let contatos = whatsapp.getTodasMensagensUsuario(numero)

    if (contatos) {
        response.status(200)
        response.json(contatos)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum número de usuário encontrado" })
    }
})

//Listar todas as conversas de um determinado nome de contato
app.get('/v1/whatsapp/usuario/:numero/conversas', function (request, response) {
    let numero = request.params.numero
    let contatoInf = request.query.contato

    let dados = whatsapp.getConversaContato(numero, contatoInf)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ "message": "Nenhuma conversa encontrada" })
    }
})

//Endpoint que filtra uma palavra específica de uma conversa do usuário com um contato
app.get('/v1/whatsapp/usuarios/:numero/conversas/filtro', function (request, response) {
    let numero = request.params.numero
    let contatoInf = request.query.contato
    let palavraChave = request.query.busca

    if (!contatoInf || !palavraChave) {
        response.status(400)
        response.json({ "message": "Parâmetros 'contato' e 'palavra' são obrigatórios" })
    }

    let dados = whatsapp.getConversaContato(numero, contatoInf)
    let mensagemFiltrada = dados && whatsapp.getBuscarMensagens(dados.mensagens, palavraChave)

    if (!dados) {
        response.status(404)
        response.json({ "message": "Nenhuma conversa foi encontrada" })
    } else if (!mensagemFiltrada) {
        response.status(404)
        response.json({ "message": "Nenhuma mensagem com essa palavra" })
    } else {
        response.status(200)
        response.json({
            "usuario": dados.usuario,
            "numero": dados.numero,
            "contato": dados.contato,
            "mensagens": mensagemFiltrada
        })
    }
})

//              START API
//Fazer o Start na API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})