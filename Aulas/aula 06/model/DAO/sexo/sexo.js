/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Sexo no banco de dados
 *          MySQL
 * Data: 13/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************/

//Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database/database_config/knexConfig.js')

//Criar a conexão com o banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDataBaseConfig.development)

const insertSexo = async function (sexo) {
    try {
        let sql = `insert into tbl_sexo (
            sexo,
            sigla
        ) values (
            '${sexo.sexo}',
            '${sexo.sigla}'
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

const updateSexo = async function (sexo) {
    try {
        let sql = `update tbl_sexo set
                        sexo    = '${sexo.sexo}',
                        sigla   = '${sexo.sigla}'
                    where id = ${sexo.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllSexo = async function () {
    try {
        let sql = 'select * from tbl_sexo order by id desc'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

    }
}

const selectByIdSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexo where id = ${id}`

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

const deleteSexo = async function (id) {
    try {
        let sql = `delete from tbl_sexo where id = ${id};`

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
    insertSexo,
    updateSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo
}