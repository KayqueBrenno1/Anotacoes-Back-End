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

//                     ENDPOINTS
//Lista todas as rotas
app.get('/v1/senai/help', function (request, response) {
    let docAPI = {
        "api-description": "API para manipular dados de Estados e Cidades",
        "date": "2026-04-02",
        "development": "Kayque Brenno Ferreira Almeida",
        "version": 1.0,
        "endpoints": [
            {
                "router1": "/v1/senai/estados",
                "description": "Retorna a lista de todos os estados"
            },
            {
                "router2": "/v1/senai/dados/estado/sp",
                "description": "Retorna dados de um estado filtrando pela sigla"
            },
            {
                "router3": "/v1/senai/capital/estado/sp",
                "description": "Retorna dados da capital de um estado filtrando pela sigla"
            },
            {
                "router4": "/v1/senai/regiao/estado/sul",
                "description": "Retorna os estados filtrando pela região"
            },
            {
                "router5": "/v1/senai/capital/pais/brasil",
                "description": "Retorna os estados que foram capitais do Brasil"
            },
            {
                "router6": "/v1/senai/cidades/estado/sp",
                "description": "Retorna as cidades filtrando pela sigla do estado"
            }
        ]
    }
    response.json(docAPI)
    response.status(200)
})

//Retorna uma lista de estados do Brasil
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200) //Requisição bem sucedida!!
})

//Retorna dados de um estado filtrando pela sigla do estado
app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let uf = request.params.uf
    let dadosEstados = estadosCidades.getDadosEstado(uf)

    if (dadosEstados) {
        response.json(dadosEstados)
        response.status(200)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrado" })
    }
})

//Retorna dados da capital filtrando pela sigla do estado
app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let uf = request.params.uf
    let capitalEstado = estadosCidades.getCapitalEstado(uf)

    if (capitalEstado) {
        response.json(capitalEstado)
        response.status(200)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado desta capital foi encontrado" })
    }
})

//Retorna os estados filtrando pela região
app.get('/v1/senai/regiao/estado/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let regiaoEstado = estadosCidades.getEstadosRegiao(regiao)

    if (regiaoEstado) {
        response.json(regiaoEstado)
        response.status(200)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado desta região foi encontrado" })
    }
})

//Retorna os estados que foram capital do Brasil
app.get('/v1/senai/capital/pais/brasil', function (request, response) {
    let capitalPais = estadosCidades.getCapitalPais()
    response.json(capitalPais)
    response.status(200)
})

//Retorna as cidades filtrando pela sigla do estado
app.get('/v1/senai/cidades/estado/:uf', function (request, response) {
    let uf = request.params.uf
    let cidadesEstado = estadosCidades.getCidades(uf)

    if (cidadesEstado) {
        response.json(cidadesEstado)
        response.status(200)
    } else {
        response.status(404)
        response.json({ "message": "Nenhuma cidade deste estado foi encontrada" })
    }
})

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})