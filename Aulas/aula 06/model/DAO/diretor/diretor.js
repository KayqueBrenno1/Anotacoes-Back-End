/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do DIRETOR no banco de dados
 *          MySQL
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

//Função para inserir um novo Diretor no banco de dados
const insertDiretor = async function (diretor) {
    try {
        let sql = `insert into tbl_diretor (
            nome,
            data_nascimento,
            biografia,
            id_sexo_diretor,
            id_nacionalidade_diretor
        ) values (
            '${diretor.nome}',
            '${diretor.data_nascimento}',
            if('${diretor.biografia}' = '', null, '${diretor.biografia}'),
            ${diretor.id_sexo_diretor},
            ${diretor.id_nacionalidade_diretor}
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

//Função para atualizar um Diretor existente no banco de dados
const updateDiretor = async function (diretor) {
    try {
        let sql = `update tbl_diretor set
	                    nome                        = replace("${diretor.nome}", "'", ""),
                        data_nascimento             = replace("${diretor.data_nascimento}", "'", ""),
                        biografia                   = if('${diretor.biografia}' = '', null, replace("${diretor.biografia}", "'", "")),
                        id_sexo_diretor             = ${diretor.id_sexo_diretor},
                        id_nacionalidade_diretor    = ${diretor.id_nacionalidade_diretor}
                    where id = ${diretor.id};`
        
        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os dados de um Diretor do banco de dados
const selectAllDiretor = async function () {
    try {
        let sql = 'select * from tbl_diretor order by id desc'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0] //Retorna somente o indice com a lista
        else
            return false

    } catch (error) {

    }
}

//Função para retornar um Diretor filtrando pelo ID
const selectByIdDiretor = async function (id) {
    try {
        let sql = `select * from tbl_diretor where id = ${id}`

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

//Função para excluir um Diretor filtrando pelo ID
const deleteDiretor = async function (id) {
    try {
        let sql = `delete from tbl_diretor where id = ${id};`

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
    insertDiretor,
    updateDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    deleteDiretor
}