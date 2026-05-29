/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do ATOR no banco de dados
 *          MySQL
 * Data: 29/05/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************/

//Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require('../../database/database_config/knexConfig.js')

//Criar a conexão com o banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDataBaseConfig.development)

//Função para inserir um novo Ator no banco de dados
const insertAtor = async function (ator) {
    try {
        let sql = `insert into tbl_ator (
            nome,
            data_nascimento,
            biografia,
            id_sexo_ator,
            id_nacionalidade_ator
        ) values (
            '${ator.nome}',
            '${ator.data_nascimento}',
            if('${ator.biografia}' = '', null, '${ator.biografia}'),
            ${ator.id_sexo_ator},
            ${ator.id_nacionalidade_ator}
        );`

        //Encaminha para o banco de dados o scriptSQL
        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }

}

//Função para atualizar um Ator existente no banco de dados
const updateAtor = async function (ator) {
    try {
        let sql = `update tbl_ator set
	                    nome                        = replace("${ator.nome}", "'", ""),
                        data_nascimento             = replace("${ator.data_nascimento}", "'", ""),
                        biografia                   = if('${ator.biografia}' = '', null, replace("${ator.biografia}", "'", "")),
                        id_sexo_ator             = ${ator.id_sexo_ator},
                        id_nacionalidade_ator    = ${ator.id_nacionalidade_ator}
                    where id = ${ator.id};`
        
        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os dados de um Ator do banco de dados
const selectAllAtor = async function () {
    try {
        let sql = 'select * from tbl_ator order by id desc'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

    }
}

//Função para retornar um Ator filtrando pelo ID
const selectByIdAtor = async function (id) {
    try {
        let sql = `select * from tbl_ator where id = ${id}`

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

//Função para excluir um Ator filtrando pelo ID
const deleteAtor = async function (id) {
    try {
        let sql = `delete from tbl_ator where id = ${id};`

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
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}