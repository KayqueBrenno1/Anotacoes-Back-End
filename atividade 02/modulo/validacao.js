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
        return false; //Retorna o erro
    } else {
        return true; //Está ok
    };
};

//Função para identificar a operação
function identificarOperacao(operacaoEscolhida) {
    let operacao = operacaoEscolhida.toLowerCase(); //padroniza tudo para minúsculo
    let sinal;

    if (operacao === "adição" || operacao === "adicao" || operacao === "mais" || operacao === "somar" || operacao === "+") {
        sinal = "+";
    } else if (operacao === "subtração" || operacao === "subtracao" || operacao === "menos" || operacao === "-") {
        sinal = "-";
    } else if (operacao === "multiplicação" || operacao === "multiplicacao" || operacao === "vezes" || operacao === "*") {
        sinal = "*";
    } else if (operacao === "divisão" || operacao === "divisao" || operacao === "/") {
        sinal = "/";
    } else {
        console.log("------------------------------------------------------------------------");
        console.log("ERRO: NÃO FOI POSSÍVEL PROSSEGUIR, VERIFIQUE SE PREENCHEU CORRETAMENTE.");
        console.log("------------------------------------------------------------------------");

        return false;
    };

    return sinal;
};

//Função para validar divisão por zero
function validarDivisao(fator2, operacao) {
    let sinal = operacao.toLowerCase(); //Padronizar as respostas do usuário

    //Caso não seja divisão ou o valor seja válido, permite a continuação do cálculo
    if ((sinal === "/" || sinal === "divisão" || sinal === "divisao") && fator2 === 0) {
        console.log("------------------------------------------------------------------------");
        console.log("ERRO: Não é possível dividir por 0.");
        console.log("------------------------------------------------------------------------");
        return false;
    } else {
        return true;
    };
};

module.exports = {
    validarNumeros,
    identificarOperacao,
    validarDivisao
};