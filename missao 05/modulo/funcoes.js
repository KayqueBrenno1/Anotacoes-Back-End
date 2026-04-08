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