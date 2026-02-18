/*************************************************************************
 * Objetivo: Arquivo para guardar funções de validação
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 13/02/2026
 * Versão 1.0
 *************************************************************************/

//Função para validar a entrada de numeros
function validarNumeros(fator1, fator2) {
    let valor1 = Number(fator1);
    let valor2 = Number(fator2);

    if (isNaN(valor1) || isNaN(valor2)) {
        console.log("------------------------------------------------------------------------");
        console.log("Os campos não foram preenchidos corretamente.");
        console.log("------------------------------------------------------------------------");
        return true;
    } else {
        return false;
    };
};

//Função para identificar a operação
function identificarOperacao(operacaoEscolhida) {
    let operacao = String(operacaoEscolhida).toLowerCase(); //padroniza tudo para minúsculo
    let sinal;

    if (operacao === "adição" || operacao === "adicao" || operacao === "soma" || operacao === "+") {
        sinal = "+";
        return sinal;
    } else if (operacao === "subtração" || operacao === "subtracao" || operacao === "menos" || operacao === "-") {
        sinal = "-";
        return sinal;
    } else if (operacao === "multiplicação" || operacao === "multiplicacao" || operacao === "vezes" || operacao === "*") {
        sinal = "*";
        return sinal;
    } else if (operacao === "divisão" || operacao === "divisao" || operacao === "/") {
        sinal = "/";
        return sinal;
    } else {
        console.log("------------------------------------------------------------------------");
        console.log("ERRO: NÃO FOI POSSÍVEL PROSSEGUIR, VERIFIQUE SE PREENCHEU CORRETAMENTE.");
        console.log("------------------------------------------------------------------------");
        return false;
    }
};

function validarOperacao(operacaoValidar) {
    let operacao = operacaoValidar;

    if (operacao == "" || !isNaN(operacao)) {
        return false
    } else {
        return operacao;
    };
}

module.exports = {
    validarNumeros,
    identificarOperacao
};