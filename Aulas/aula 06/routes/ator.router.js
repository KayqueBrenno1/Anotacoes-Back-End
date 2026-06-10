// Import do EXPRESS
const express = require('express')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Criando um objeto de rota para os Endpoints de Genero
const router = express.Router()

//Import da controller do projeto
const controllerAtor = require('../controller/ator/controller_ator.js')

//                                  ENDPOINTS ATOR
router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerAtor.inserirNovoAtor(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerAtor.listarAtor()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerAtor.buscarAtor(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerAtor.atualizarAtor(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id = request.params.id

    const result = await controllerAtor.excluirAtor(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router