/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do Diretor
 * data: 22/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
*****************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const diretorDAO = require('../../model/DAO/diretor/diretor.js')

//Import das Controllers
const controllerSexo = require('../sexo/controller_sexo.js')
const controllerNacionalidade = require('../nacionalidade/controller_nacionalidade.js')

//Função para validar os dados de cadastro do Diretor
const validarDados = async function (diretor) {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (diretor.nome == undefined || diretor.nome == '' || diretor.nome == null || diretor.nome.length > 100) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == '' || diretor.data_nascimento == null || diretor.data_nascimento.length != 10) {
        customMessages.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDO'
    } else if (diretor.biografia == undefined || !isNaN(diretor.biografia)) {
        customMessages.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDO'
    } else if (filme.id_sexo_diretor == undefined || filme.id_sexo_diretor == '' || filme.id_sexo_diretor == null || filme.id_sexo_diretor < 1 || isNaN(filme.id_sexo_diretor)) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DE SEXO] INVÁLIDO'
    } else if (filme.id_nacionalidade_diretor == undefined || filme.id_nacionalidade_diretor == '' || filme.id_nacionalidade_diretor == null || filme.id_nacionalidade_diretor < 1 || isNaN(filme.id_nacionalidade_diretor)) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DE NACIONALIDADE] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (diretor) {
    //Tratamento para eliminar a chegada da aspas (') como caracter inválido
    diretor.nome = diretor.nome.replaceAll("'", "")
    diretor.data_nascimento = diretor.data_nascimento.replaceAll("'", "")
    diretor.biografia = diretor.biografia.replaceAll("'", "")
    diretor.id_sexo_diretor = diretor.id_sexo_diretor.replaceAll("'", "")
    diretor.id_nacionalidade_diretor = diretor.id_nacionalidade_diretor.replaceAll("'", "")

    return diretor
}

//Função para inserir um novo Diretor
const inserirNovoDiretor = async function (diretor, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(diretor)

            if (validacao)
                return validacao //400
            else { //200

                let result = await diretorDAO.insertDiretor(await tratarDados(diretor))

                if (result) {
                    diretor.id = result

                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = diretor

                    return customMessages.DEFAULT_MESSAGE //201
                } else {
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

//Função para atualizar um Diretor existente
const atualizarDiretor = async function (diretor, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarDiretor = await buscarDiretor(id)

            if (resultBuscarDiretor.status) {
                let validar = await validarDados(diretor)

                if (!validar) {
                    diretor.id = Number(id)

                    let result = await diretorDAO.updateDiretor(await tratarDados(diretor))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATE_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATE_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATE_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response = diretor

                        return customMessages.DEFAULT_MESSAGE //200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
                    }
                } else {
                    return validar //400
                }
            } else {
                return resultBuscarDiretor //400, 404 ou 500
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar todos os Diretores existentes
const listarDiretor = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorDAO.selectAllDiretor()

        if (result) {
            if (result.length > 0) {
                // Manipulação dos dados do Sexo e Nacionalidade
                // Percorre o array de Diretores
                for (let diretor of result) {
                    // Busca na controller do Sexo o id referente à FK do Sexo
                    let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo_diretor)

                    // Se encontrar o id
                    if (resultSexo.status) {
                        // Adiciona um atributo Sexo e Sigla no JSON do Diretor e coloca o resultado com os dados da mesma
                        diretor.sexo = resultSexo.response.sexo
                        diretor.sigla = resultSexo.response.sigla

                        // Apaga o atributo id_sexo_diretor do JSON de Diretor
                        delete diretor.id_sexo_diretor
                    }

                    let resultNacionalidade = await controllerNacionalidade.buscarNacionalidade(diretor.id_nacionalidade_diretor)

                    if (resultNacionalidade.status) {
                        diretor.nacionalidade = resultNacionalidade.response.nacionalidade
                        diretor.sigla = resultNacionalidade.response.sigla

                        //Apaga o atributo id_nacionalidade_diretor do JSON de Diretor
                        delete diretor.id_nacionalidade_diretor
                    }
                }

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.diretor = result

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

//Função para retornar um Diretor filtrando pelo id
const buscarDiretor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o ID seja um número valido
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST //400
        } else {
            let result = await diretorDAO.selectByIdDiretor(id)

            if (result) {
                if (result.length > 0) {
                    // Manipulação dos dados do Sexo e Nacionalidade
                    // Percorre o array de Diretores
                    for (let diretor of result) {
                        // Busca na controller do Sexo o id referente à FK do Sexo
                        let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo_diretor)

                        // Se encontrar o id
                        if (resultSexo.status) {
                            // Adiciona um atributo Sexo e Sigla no JSON do Diretor e coloca o resultado com os dados da mesma
                            diretor.sexo = resultSexo.response.sexo
                            diretor.sigla = resultSexo.response.sigla

                            // Apaga o atributo id_sexo_diretor do JSON de Diretor
                            delete diretor.id_sexo_diretor
                        }

                        let resultNacionalidade = await controllerNacionalidade.buscarNacionalidade(diretor.id_nacionalidade_diretor)

                        if (resultNacionalidade.status) {
                            diretor.nacionalidade = resultNacionalidade.response.nacionalidade
                            diretor.sigla = resultNacionalidade.response.sigla

                            //Apaga o atributo id_nacionalidade_diretor do JSON de Diretor
                            delete diretor.id_nacionalidade_diretor
                        }
                    }

                    customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.diretor = result

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

//Função para excluir um Diretor
const excluirDiretor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarDiretor = await buscarDiretor(id)

        if (resultBuscarDiretor.status) {
            let result = await diretorDAO.deleteDiretor(id)

            if (result) {
                return customMessages.SUCCESS_DELETE_ITEM //204
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        } else {
            return resultBuscarDiretor //400 ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor
}