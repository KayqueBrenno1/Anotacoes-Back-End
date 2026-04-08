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
    let dadosUsuario = false

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

    return dadosUsuario
}