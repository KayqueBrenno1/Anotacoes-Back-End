/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da NACIONALIDADE
 * data_lancamento: 13/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const validarDados = async function (nacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == null ||  nacionalidade.nacionalidade.length > 90 ||
            nacionalidade.sigla == undefined || nacionalidade.sigla == '' || nacionalidade.sigla == null || nacionalidade.sigla.length > 4) {
        customMessages.ERROR_BAD_REQUEST.field = '[NACIONALIDADE] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (nacionalidade) {
    nacionalidade.nacionalidade = nacionalidade.nacionalidade.replaceAll("'", "")
    nacionalidade.sigla = nacionalidade.sigla.replaceAll("'", "")

    return nacionalidade
}

//Função para inserir uma nova NACIONALIDADE
const inserirNovaNacionalidade = async function (nacionalidade, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(nacionalidade)
            if (validacao)
                return validacao //400
            else { //200
                let result = await nacionalidadeDAO.insertNacionalidade(await tratarDados(nacionalidade))

                if (result) {
                    nacionalidade.id = result

                    customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response     = nacionalidade

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

//Função para atualizar uma NACIONALIDADE existente
const atualizarNacionalidade = async function (nacionalidade, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarNacionalidade = await buscarNacionalidade(id)

            if (resultBuscarNacionalidade.status) {
                let validar = await validarDados(nacionalidade)

                if (!validar) {
                    nacionalidade.id = Number(id)

                    let result = await nacionalidadeDAO.updateNacionalidade(await tratarDados(nacionalidade))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status       = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code  = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message      = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response     = nacionalidade

                        return customMessages.DEFAULT_MESSAGE //200 (Atualizado)
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarNacionalidade
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos as NACIONALIDADES existentes
const listarNacionalidade = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status                 = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code            = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count         = result.length
                customMessages.DEFAULT_MESSAGE.response.nacionalidade = result

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

//Função para retornar uma NACIONALIDADE filtrando pelo id
const buscarNacionalidade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null ||  isNaN(id) || id <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST //400
        } else {
            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                 = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code            = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.nacionalidade = result

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

//Função para excluir uma NACIONALIDADE
const excluirNacionalidade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarNacionalidade = await buscarNacionalidade(id)

        if (resultBuscarNacionalidade.status) {
            let result = await nacionalidadeDAO.deleteNacionalidade(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarNacionalidade
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

module.exports = {
    inserirNovaNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade
}