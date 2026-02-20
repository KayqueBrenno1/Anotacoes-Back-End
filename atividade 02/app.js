/*************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos matématicos.
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 13/02/2026
 * Versão 1.0
 *************************************************************************/

//Import da biblioteca de entrada de dados
const readline = require("readline");

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Import dos arquivos
const validacao = require("./modulo/validacao.js");
const calculo = require("./modulo/calculo.js");

console.log("\n----------------------------CALCULOS SA---------------------------------");

//Entrada de dados do usuário
entradaDeDados.question("Digite o primeiro fator: ", function (numero1) {
    let primeiroFator = Number(numero1.trim().replace(",", "."));

    entradaDeDados.question("Digite o segundo fator: ", function (numero2) {
        let segundoFator = Number(numero2.trim().replace(",", "."));

        entradaDeDados.question("Digite qual dessas operações você deseja utilizar (Adição, Subtração, Multiplicação ou Divisão): ", function (operacao) {
            let operacaoEscolhida = operacao;

            let sinal = validacao.identificarOperacao(operacaoEscolhida);
            let verificarNumeros = validacao.validarNumeros(primeiroFator, segundoFator);
            let verificarDivisao = validacao.validarDivisao(segundoFator, operacaoEscolhida);

            if (verificarNumeros && sinal && verificarDivisao) {
                let calculoFinal = calculo.calcularSituacao(primeiroFator, segundoFator, operacaoEscolhida);

                console.log("------------------------------------------------------------------------");
                console.log("Primeiro número escolhido: " + primeiroFator);
                console.log("Segundo número escolhido: " + segundoFator);
                console.log("Operação escolhida: " + validacao.identificarOperacao(operacaoEscolhida));
                console.log("\nO resultado final foi: " + calculoFinal);
                console.log("------------------------------------------------------------------------");

                entradaDeDados.close();
            } else {
                entradaDeDados.close();
            };
        });
    });
});
