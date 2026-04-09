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

const getConversaContato = function (numberUsuario) {
    let numberTel = String(numberUsuario)
    let conversa = []

    for (let user of users) {
        if (numberTel == user.number) {
            user.contacts.forEach(contato => {
                conversa.push({
                    "numero_usuario": user.number,
                    "nome_contato": contato.name,
                    "mensagens": contato.messages
                })
            })
        }
    }

    if (conversa.length == 0)
        return false

    return { conversa }
}

console.log(getConversaContato(11987876567))