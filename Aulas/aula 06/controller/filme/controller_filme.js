/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * data_lancamento: 17/04/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
*****************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Função para validar os dados de cadastro do filme
const validarDados = async function (filme) {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        customMessages.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
        customMessages.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessages.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao < 5) {
        customMessages.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessages.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessages.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função para validar a entrada dos dados do filme
            let validacao = await validarDados(filme)

            //Retorna um JSON de erro caso algum atributo seja inválido, se não, retorna um false (Não teve erro)
            if (validacao)
                return validacao //400
            else { //200

                //Encaminha os dados do filme para o DAO inserir no Banco de Dados
                let result = await filmeDAO.insertFilme(filme)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message

                    return customMessages.DEFAULT_MESSAGE //201
                } else { //erro 500 (model)
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }

}

//Função para atualizar um filme existente
const atualizarFilme = async function () {

}

//Função para retornar todos os filmes existentes
const listarFilme = async function () {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama a função do DAO para retornar a lista de filmes do Banco de Dados
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguiu processar o script no Banco de Dados
        if (result) {
            //Validação para verificar se o conteúdo do array tem dados de retorno ou se está vazio
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.filme = result

                return customMessages.DEFAULT_MESSAGE
            } else {
                return customMessages.ERROR_NOT_FOUND //404
            }
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para retornar um filme filtrando pelo id
const buscarFilme = async function (id) {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o ID seja um número valido
        if (String(id).replaceAll(' ', '') == '' || id == null || id == undefined || isNaN(id)) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST //400
        } else {
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            //Validação para verificar se o DAO retornou dados ou um FALSE (erro)
            if (result) {
                //Validação para verificar se o DAO tem algum dado no Array
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.filme = result

                    return customMessages.DEFAULT_MESSAGE //200
                } else {
                    return customMessages.ERROR_NOT_FOUND //404
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para excluir um filme
const excluirFilme = async function () {

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}