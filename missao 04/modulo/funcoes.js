/***********************************************************************************
 * Objetivo: Trazer informações sobre os estados do Brasil
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 18/03/2026 - 20/03/2026
 * Versão: 1.0
************************************************************************************/

const informacoesEstados = require('./estados_cidades.js')

const localizarEstados = informacoesEstados.listaDeEstados.estados

const getListaDeEstados = function () {
    let uf = []
    let quantidade
    let lista

    localizarEstados.forEach(function (sigla) {
        uf.push(sigla.sigla)
    })

    quantidade = uf.length
    lista = { uf, quantidade }

    return lista
}

const getDadosEstado = function (siglaEstado) {
    let sigla = String(siglaEstado).toUpperCase()
    let dadosEstado = false

    for(let estado of localizarEstados){
        if (estado.sigla == sigla) {
            dadosEstado = {
                "uf": estado.sigla,
                "descricao": estado.nome,
                "capital": estado.capital,
                "regiao": estado.regiao
            }
        }
    }

    return dadosEstado
}

const getCapitalEstado = function (siglaEstado) {
    let sigla = String(siglaEstado).toUpperCase()
    let dadosEstado = false

    localizarEstados.forEach(function (estado) {
        if (estado.sigla == sigla) {
            return dadosEstado = {
                "uf": estado.sigla, "descricao": estado.nome, "capital": estado.capital
            }
        }
    })
}

const getEstadosRegiao = function (regiaoEscolhida) {
    let regiao = String(regiaoEscolhida).toUpperCase()
    let dadosRegiao = {
        "regiao": regiaoEscolhida.toUpperCase(),
        "estados": []
    }

    for(let estado of localizarEstados){
        if(regiao == String(estado.regiao).toUpperCase()){
            dadosRegiao.estados.push({
                "uf": estado.sigla, "descricao": estado.nome
            })
        }
    }
    
    if(dadosRegiao.estados.length === 0)
        return false
    
    return dadosRegiao
}

const getCapitalPais = function(){
    let capitaisPais = {
        "capitais": []
    }

    localizarEstados.forEach(function(pegarCapitais){
        if(pegarCapitais.capital_pais){
            capitaisPais.capitais.push({
                "capital_atual": pegarCapitais.capital_pais.capital,
                "uf": pegarCapitais.sigla,
                "descricao": pegarCapitais.nome,
                "capital": pegarCapitais.capital,
                "regiao": pegarCapitais.regiao,
                "capital_pais_ano_inicio": pegarCapitais.capital_pais.ano_inicio,
                "capital_pais_ano_termino": pegarCapitais.capital_pais.ano_fim
            })
        }
    })

    return capitaisPais
}

const getCidades = function(cidadesSigla){
    let siglaInf = String(cidadesSigla).toUpperCase()
    let infoCidades
    let cidades = []

    for(let sigla of localizarEstados){
        if(siglaInf == String(sigla.sigla).toUpperCase()){
            sigla.cidades.forEach(function(todasCidades){
                cidades.push(todasCidades.nome)

                infoCidades = {
                    "uf": sigla.sigla,
                    "descricao": sigla.nome,
                    "quantidade_cidades": sigla.cidades.length,
                    "cidades": cidades
                }
            })   
        }
    }

    if(cidades.length === 0)
        return false

    return infoCidades
}