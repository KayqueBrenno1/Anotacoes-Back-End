/***********************************************************************************
 * Objetivo: Trazer informações sobre os estados do Brasil
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 18/03/2026
 * Versão: 1.0
************************************************************************************/

const informacoesEstados = require('./estados_cidades.js')

const localizarEstados = informacoesEstados.listaDeEstados.estados

const getListaDeEstados = function(){
    let uf = []
    let quantidade
    let lista

    localizarEstados.forEach(function(sigla){
        uf.push(sigla.sigla)
    })
    
    quantidade = uf.length
    lista = {uf, quantidade}

    return lista
}

const getDadosEstado = function(estado){
    
    let estadoEscolhido = [{
        "uf": localizarEstados,
        "descricao": localizarEstados,
        "capital": localizarEstados,
        "regiao": localizarEstados
    }]
}