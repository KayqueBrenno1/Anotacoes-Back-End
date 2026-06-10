// Import do EXPRESS
const express = require('express')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Criando um objeto de rota para os Endpoints de Genero
const router = express.Router()

//Import da controller
const controllerFilme = require('../controller/filme/controller_filme.js')

//                                       ENDPOINTS
router.post('/', bodyParserJSON, async function (request, response) {
    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    //Chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    //Recebe o ID do filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    //Recebe o ID do registro a ser atualizado
    let id = request.params.id
    //Recebe os dados do body que serão modificados no Banco de Dados
    let dados = request.body

    //Chama a função para atualizar o filme, devemos encaminhar as 3 variáveis na mesma sequência
    //que a função foi criada na controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    //Recebe o ID do filme via parametro
    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router