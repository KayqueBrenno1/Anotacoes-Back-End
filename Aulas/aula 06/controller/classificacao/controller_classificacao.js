/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de Classificacao
 * data_lancamento: 08/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

//Função para validar os dados de cadastro da classificação
const validarDados = async function (classificacao) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (classificacao.classificacao == undefined || classificacao.classificacao == '' ||
         classificacao.classificacao == null ||  classificacao.classificacao.length > 6) {
        customMessages.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (classificacao) {
    classificacao.classificacao = classificacao.classificacao.replaceAll("'", "")

    return classificacao
}

//Função para inserir uma nova classificação
const inserirNovaClassificacao = async function (classificacao, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(classificacao)
            if (validacao)
                return validacao //400
            else { //200
                let result = await classificacaoDAO.insertClassificacao(await tratarDados(classificacao))

                if (result) {
                    classificacao.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = classificacao

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

//Função para atualizar uma Classificação existente
const atualizarClassificacao = async function (classificacao, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarClassificacao = await buscarClassificacao(id)

            if (resultBuscarClassificacao.status) {
                let validar = await validarDados(classificacao)

                if (!validar) {
                    classificacao.id = Number(id)

                    let result = await classificacaoDAO.updateClassificacao(await tratarDados(classificacao))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = classificacao

                        return customMessages.DEFAULT_MESSAGE //200 (Atualizado)
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
                    }
                } else {
                    return validar //400 de validação dos campos do banco de dados
                }
            } else {
                return resultBuscarClassificacao //400 (ID inválido) ou 404 (não encontrado) ou 500
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar todos as Classificações existentes
const listarClassificacao = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await classificacaoDAO.selectAllClassificacao()

        //Validação para verificar se o DAO conseguiu processar o script no Banco de Dados
        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status                   = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code              = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count           = result.length
                customMessages.DEFAULT_MESSAGE.response.classificacao   = result

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

//Função para retornar uma Classificação filtrando pelo id
const buscarClassificacao = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null ||  isNaN(id) || id <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST //400
        } else {
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                   = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code              = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.classificacao   = result

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

//Função para excluir uma classificação
const excluirClassificacao = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarClassificacao = await buscarClassificacao(id)

        if (resultBuscarClassificacao.status) {
            let result = await classificacaoDAO.deleteClassificacao(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM //204 (delete)
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        } else {
            return resultBuscarClassificacao //400 (ID inválido) ou 404 (não encontrado)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

module.exports = {
    inserirNovaClassificacao,
    listarClassificacao,
    buscarClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}