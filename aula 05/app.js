/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
 * Data: 01/04/2026
 * Autor: Kayque Almeida
 * Versão: 1.0
********************************************************************************************************************/

/********
 * Para configurar a API:
 *  Instalar o EXPRESS -> npm install express --save
 *      Dependencia para configurar e utilizar o protocolo HTTP para criar a API
 * 
 *  Instalar o CORS    -> npm install cors --save
 *      Dependencia para configurar as permissões de acesso da API
*/
//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configurações do CORS da API
const corsOptions = {
    origin: ['*'], //Configuração de origem da requisição (IP ou Dominio)
    methods: 'GET', //Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
    //Tipo de dados  //Autorização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./modulo/funcoes.js')

app.get('/v1/senai/rotas', function (request, response) {
    response.json([
        "/v1/senai/estados",
        "/v1/senai/dados/estado/:uf",
        "/v1/senai/capital/estado/:uf",
        "/v1/senai/regiao/estado/:regiao",
        "/v1/senai/capital/pais",
        "/v1/senai/cidades/estado/:uf"
    ])
    response.status(200) //Requisição bem sucedida!!
})

//Endpoint para listar os estados
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200) //Requisição bem sucedida!!
})

app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let uf = request.params.uf
    let dadosEstados = estadosCidades.getDadosEstado(uf)

    if (dadosEstados) {
        response.json(dadosEstados)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado" })
        response.status(404)
    }
})

app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let uf = request.params.uf
    let capitalEstado = estadosCidades.getCapitalEstado(uf)

    if (capitalEstado) {
        response.json(capitalEstado)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado desta capital foi encontrado" })
        response.status(404)
    }
})

app.get('/v1/senai/regiao/estado/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let regiaoEstado = estadosCidades.getEstadosRegiao(regiao)

    if (regiaoEstado) {
        response.json(regiaoEstado)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado desta região foi encontrado" })
        response.status(404)
    }
})

app.get('/v1/senai/capital/pais', function (request, response) {
    let capitalPais = estadosCidades.getCapitalPais()
    response.json(capitalPais)
    response.status(200)
})

app.get('/v1/senai/cidades/estado/:uf', function (request, response) {
    let uf = request.params.uf
    let cidadesEstado = estadosCidades.getCidades(uf)

    if (cidadesEstado) {
        response.json(cidadesEstado)
        response.status(200)
    } else {
        response.json({ "message": "Nenhuma cidade deste estado foi encontrada" })
        response.status(404)
    }
})

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})