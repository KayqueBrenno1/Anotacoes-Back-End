/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de ATIVIDADE
 * data_lancamento: 13/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const atividadeDAO = require('../../model/DAO/atividade/atividade.js')

//Import das Controllers
const controllerAtividadeAtor       = require('../ator/controller_atividade_ator.js')
const controllerAtividadeDiretor    = require('../diretor/controller_atividade_diretor.js')

const validarDados = async function (atividade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (atividade.atividade == undefined || atividade.atividade == '' || atividade.atividade == null ||  atividade.atividade.length > 40) {
        customMessages.ERROR_BAD_REQUEST.field = '[ATIVIDADE] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (atividade) {
    atividade.atividade = atividade.atividade.replaceAll("'", "")

    return atividade
}

//Função para inserir um novo ATIVIDADE
const inserirNovaAtividade = async function (atividade, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(atividade)
            if (validacao)
                return validacao
            else {
                let result = await atividadeDAO.insertAtividade(await tratarDados(atividade))

                if (result) {
                    atividade.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = atividade

                    return customMessages.DEFAULT_MESSAGE
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Função para atualizar uma ATIVIDADE existente
const atualizarAtividade = async function (atividade, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarAtividade = await buscarAtividade(id)

            if (resultBuscarAtividade.status) {
                let validar = await validarDados(atividade)

                if (!validar) {
                    atividade.id = Number(id)

                    let result = await atividadeDAO.updateAtividade(await tratarDados(atividade))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = atividade

                        return customMessages.DEFAULT_MESSAGE //200 (Atualizado)
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarAtividade
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos as ATIVIDADES existentes
const listarAtividade = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atividadeDAO.selectAllAtividade()

        if (result) {
            if (result.length > 0) {
                for (let atividade of result) {
                    let resultAtoresAtividade = await controllerAtividadeAtor
                                                        .buscarAtoresIdAtividade(atividade.id)

                    if (resultAtoresAtividade.status)
                        atividade.ator = resultAtoresAtividade.response.atividade_ator

                    let resultDiretoresAtividade = await controllerAtividadeDiretor
                                                            .buscarDiretoresIdAtividade(atividade.id)

                    if (resultDiretoresAtividade.status)
                        atividade.diretor = resultDiretoresAtividade.response.atividade_diretor
                }

                customMessages.DEFAULT_MESSAGE.status               = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code          = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count       = result.length
                customMessages.DEFAULT_MESSAGE.response.atividade   = result

                return customMessages.DEFAULT_MESSAGE
            } else {
                return customMessages.ERROR_NOT_FOUND
            }
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar uma ATIVIDADE filtrando pelo id
const buscarAtividade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null ||  isNaN(id) || id <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await atividadeDAO.selectByIdAtividade(id)

            if (result) {
                if (result.length > 0) {
                    for (let atividade of result) {
                        let resultAtoresAtividade = await controllerAtividadeAtor
                                                            .buscarAtoresIdAtividade(atividade.id)

                        if (resultAtoresAtividade.status)
                            atividade.ator = resultAtoresAtividade.response.atividade_ator

                        let resultDiretoresAtividade = await controllerAtividadeDiretor
                                                                .buscarDiretoresIdAtividade(atividade.id)

                        if (resultDiretoresAtividade.status)
                            atividade.diretor = resultDiretoresAtividade.response.atividade_diretor
                    }

                    customMessages.DEFAULT_MESSAGE.status               = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code          = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.atividade   = result

                    return customMessages.DEFAULT_MESSAGE
                } else {
                    return customMessages.ERROR_NOT_FOUND
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para excluir uma ATIVIDADE
const excluirAtividade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarAtividade = await buscarAtividade(id)

        if (resultBuscarAtividade.status) {
            let result = await atividadeDAO.deleteAtividade(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarAtividade
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

module.exports = {
    inserirNovaAtividade,
    listarAtividade,
    buscarAtividade,
    atualizarAtividade,
    excluirAtividade
}