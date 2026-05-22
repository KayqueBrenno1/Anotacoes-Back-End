/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de GENERO
 * data: 13/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const generoDAO = require('../../model/DAO/genero/genero.js')

const validarDados = async function (genero) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (genero.genero == undefined || genero.genero == '' || genero.genero == null ||  genero.genero.length > 30) {
        customMessages.ERROR_BAD_REQUEST.field = '[GENERO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (genero) {
    genero.genero = genero.genero.replaceAll("'", "")

    return genero
}

//Função para inserir um novo GENERO
const inserirNovoGenero = async function (genero, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(genero)
            if (validacao)
                return validacao
            else {
                let result = await generoDAO.insertGenero(await tratarDados(genero))

                if (result) {
                    genero.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = genero

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

//Função para atualizar um GENERO existente
const atualizarGenero = async function (genero, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarGenero = await buscarGenero(id)

            if (resultBuscarGenero.status) {
                let validar = await validarDados(genero)

                if (!validar) {
                    genero.id = Number(id)

                    let result = await generoDAO.updateGenero(await tratarDados(genero))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = genero

                        return customMessages.DEFAULT_MESSAGE //200 (Atualizado)
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarGenero
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os GENEROS existentes
const listarGenero = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await generoDAO.selectAllGenero()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status          = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code     = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count  = result.length
                customMessages.DEFAULT_MESSAGE.response.genero = result

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

//Função para retornar um GENERO filtrando pelo id
const buscarGenero = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null ||  isNaN(id) || id <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST
        } else {
            let result = await generoDAO.selectByIdGenero(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.genero  = result

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

//Função para excluir um GENERO
const excluirGenero = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarGenero = await buscarGenero(id)

        if (resultBuscarGenero.status) {
            let result = await generoDAO.deleteGenero(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarGenero
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

module.exports = {
    inserirNovoGenero,
    listarGenero,
    buscarGenero,
    atualizarGenero,
    excluirGenero
}