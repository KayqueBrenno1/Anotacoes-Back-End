/***********************************************************************************
 * Objetivo: Funções para trazer informações de contatos
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 08/04/2026
 * Versão: 1.0
************************************************************************************/

const infContatos = require('./contatos.js')

const users = infContatos.contatos['whats-users']

const getListaTodosUsuario = function () {
    return { users }
}

const getDadosUsuario = function (number) {
    let numberTel = String(number)
    let dadosUsuario = {}

    for (let infUser of users) {
        if (infUser.number == numberTel) {
            dadosUsuario = {
                "number": infUser.number,
                "nome": infUser.account,
                "nick": infUser.nickname,
                "account_creation_date": infUser['created-since'].start,
                "account_closing_date": infUser['created-since'].end,
                "profile_image": infUser['profile-image'],
                "background": infUser.background
            }
        }
    }

    if (Object.keys(dadosUsuario).length == 0)
        return false

    return dadosUsuario
}

const getDadosContatos = function (number) {
    let numberTel = String(number)
    let dadosContatos = {
        "contatos": []
    }

    for (let dados of users) {
        if (numberTel == dados.number) {
            dados.contacts.forEach(function (infContato) {
                dadosContatos.contatos.push({
                    "name": infContato.name,
                    "image": infContato.image,
                    "description": infContato.description
                })
            })
        }
    }

    if (dadosContatos.contatos.length == 0)
        return false

    return dadosContatos
}

const getTodasMensagensUsuario = function (number) {
    let numberTel = String(number)
    let msgUsuario = {}

    for (let dados of users) {
        if (numberTel == dados.number) {
            msgUsuario.contatos = dados.contacts
        }
    }

    if (Object.keys(msgUsuario).length == 0)
        return false

    return msgUsuario
}

const getConversaContato = function (numberUsuario, nomeContato) {
    let dados = {
        "usuario": false,
        "numero": numberUsuario,
        "contato": false,
        "mensagens": []
    }

    let nome = String(nomeContato).toUpperCase()

    for (let usuario of users) {
        if (usuario.number == String(numberUsuario)) {
            dados.usuario = usuario.account

            usuario.contacts.forEach(function (itemContato) {
                let nomeContatoInf = itemContato.name.toUpperCase()

                if (nome === nomeContatoInf) {
                    dados.contato = itemContato.name

                    itemContato.messages.forEach(function (itensMensagem) {
                        dados.mensagens.push({
                            "remetente": itensMensagem.sender,
                            "conteudo": itensMensagem.content,
                            "horario": itensMensagem.time
                        })
                    })
                }
            })
        }
    }

    if (dados.mensagens.length == 0)
        return false

    return dados
}

const getBuscarMensagens = function (mensagens, busca) {
    let resultado = []
    let conversas

    for (let mensagem of mensagens) {
        conversas = (mensagem.conteudo || "").toLowerCase()

        if (conversas.includes(busca.toLowerCase()))
            resultado.push(mensagem)
    }

    if (!busca || resultado.length == 0)
        return false

    return resultado
}

module.exports = {
    getListaTodosUsuario,
    getDadosUsuario,
    getDadosContatos,
    getTodasMensagensUsuario,
    getConversaContato,
    getBuscarMensagens
}