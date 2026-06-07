/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados MySQL na tabela 
 *      de relação entre filme e diretor (tbl_filme_diretor)
 * Data: 06/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************/

//Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database/database_config/knexConfig.js')

//Criar a conexão com o banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDataBaseConfig.development)

const insertFilmeDiretor = async function (filmeDiretor) {
    try {
        let sql = `insert into tbl_filme_diretor (
            id_filme,
            id_diretor
        ) values (
            ${filmeDiretor.id_filme},
            ${filmeDiretor.id_diretor}
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

const updateFilmeDiretor = async function (filmeDiretor) {
    try {
        let sql = `update tbl_filme_diretor set
                        id_filme    = ${filmeDiretor.id_filme}
                        id_diretor   = ${filmeDiretor.id_diretor}
                    where id = ${filmeDiretor.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilmeDiretor = async function () {
    try {
        let sql = 'select * from tbl_filme_diretor order by id desc;'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

    }
}

const selectByIdFilmeDiretor = async function (id) {
    try {
        let sql = `select * from tbl_filme_diretor where id = ${id};`

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

//Função para retornar os dados do Diretor filtrando pelo ID do Filme
const selectDiretoresByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_diretor.*
                    from tbl_filme

                        inner join tbl_filme_diretor
                            on tbl_filme.id = tbl_filme_diretor.id_filme
                        inner join tbl_diretor
                            on tbl_diretor.id = tbl_filme_diretor.id_diretor
                    
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

//Função para retornar os dados do Filme filtrando pelo ID do Diretor
const selectFilmesByIdDiretor = async function (idDiretor) {
    try {
        let sql = ` select tbl_filme.*
                    from tbl_filme
                    
                        inner join tbl_filme_diretor
                            on tbl_filme.id = tbl_filme_diretor.id_filme
                        inner join tbl_diretor
                            on tbl_diretor.id = tbl_filme_diretor.id_diretor
                    
                    where tbl_diretor.id = ${idDiretor};`

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

const deleteFilmeDiretor = async function (id) {
    try {
        let sql = `delete from tbl_filme_diretor where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os diretores relacionados com um filme
//Obs: Esta função será utilizada no PUT do Filme
const deleteDiretoresByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_diretor where id_filme = ${idFilme};`

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
    insertFilmeDiretor,
    updateFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    selectDiretoresByIdFilme,
    selectFilmesByIdDiretor,
    deleteFilmeDiretor,
    deleteDiretoresByIdFilme
}