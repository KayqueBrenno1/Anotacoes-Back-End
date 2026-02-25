/****************************************************************************************
 * Objetivo: Arquivo responsável por gerar uma tabuada utilizando WHILE E FOR
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 25/02/2026
 * Versão 1.0
 ****************************************************************************************/

//Import da biblioteca de operações matemáticas
const calculosMatematicos = require("./calculo.js");

//Função para imprimir a tabuada
const gerarTabuadaWhile = function (tabuada) {
    let tab = Number(tabuada);
    let cont = 0;
    let resultado;

    while (cont <= 10) {
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab, cont);
        console.log(tab + " x " + cont + " = " + resultado);

        //cont = cont + 1;
        //cont +=1;
        cont++;
    };
};

const gerarTabuadaFor = function (tabuada) {
    let tab = Number(tabuada);
    let resultado;

    for (let cont = 0; cont <= 10; cont ++) {
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab, cont);
        console.log(tab + " x " + cont + " = " + resultado);
    };
};

gerarTabuadaFor(7)