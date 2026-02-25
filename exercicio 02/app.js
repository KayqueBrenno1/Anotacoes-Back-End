/*************************************************************************
 * Objetivo: Arquivo somente para realizar a entrada de dados
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 20/02/2026
 * Versão 1.0
 *************************************************************************/

const calculosMatematicos = require("./modulo/calculo.js");

let n1 = 50;
let n2 = 30;
let sinal = "somar";

let validar = calculosMatematicos.validarDados(n1, n2, sinal);

if(validar){
    let result = calculosMatematicos.calcular(n1, n2, sinal);

    if(result)
        console.log(result);
    else
        console.log("ERRO: Não foi possível fazer o calculo.");
}else{
    console.log("ERRO: Validação incorreta.");
}