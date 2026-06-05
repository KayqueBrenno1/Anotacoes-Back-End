/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados MySQL na tabela 
 *      de relação entre filme e genero
 * Data: 22/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************/

//Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database/database_config/knexConfig.js')

//Criar a conexão com o banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDataBaseConfig.development)

const insertFilmeGenero = async function (generoFilme) {
    try {
        let sql = `insert into tbl_genero_filme (
            id_filme,
            id_genero
        ) values (
            ${generoFilme.id_filme},
            ${generoFilme.id_genero}
        );`

        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateFilmeGenero = async function (generoFilme) {
    try {
        let sql = `update tbl_genero_filme set
                        id_filme    = ${generoFilme.id_filme}
                        id_genero   = ${generoFilme.id_genero}
                    where id = ${generoFilme.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilmeGenero = async function () {
    try {
        let sql = 'select * from tbl_genero_filme order by id desc;'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

    }
}

const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero_filme where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para retornar os dados do Genero filtrando pelo ID do Filme
const selectGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_genero.*
                    from tbl_filme

                        inner join tbl_genero_filme
                            on tbl_filme.id = tbl_genero_filme.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_genero_filme.id_genero
                    
                    where tbl_filme.id = ${idFilme};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para retornar os dados do Filme filtrando pelo ID do Genero
const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = ` select tbl_filme.*
                    from tbl_filme
                    
                        inner join tbl_genero_filme
                            on tbl_filme.id = tbl_genero_filme.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_genero_filme.id_genero
                    
                    where tbl_genero.id = ${idGenero};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteFilmeGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero_filme where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os generos relacionados com um filme
//Obs: Esta função será utilizada no PUT do Filme
const deleteGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_genero_filme where id_filme = ${idFilme};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    deleteFilmeGenero,
    deleteGenerosByIdFilme
}