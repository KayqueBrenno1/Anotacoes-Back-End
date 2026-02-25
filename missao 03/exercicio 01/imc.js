/****************************************************************************************
 * Objetivo: Arquivo responsável por realizar cálculo de IMC
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 25/02/2026
 * Versão 1.0
 ****************************************************************************************/

//Função para calcular o IMC
const calcularImc = function(valor1, valor2){
    let peso = Number(valor1);
    let altura = Number(valor2);

    let alturaAoQuadrado = altura * altura;

    let imc = peso / alturaAoQuadrado;

    return imc;
};

//Função para verificar o status
const statusImc = function(valorImc){
    let imc = Number(valorImc);
    let status;

    if(imc <= 18.5)
        status = "Abaixo do peso";
    else if(imc > 18.5 && imc <= 24.9)
        status = "Peso normal";
    else if(imc >= 25 && imc <= 29.9)
        status = "Acima do peso (sobrepeso)";
    else if(imc >= 30 && imc <= 34.9)
        status = "Obesidade 1";
    else if(imc >= 35 && imc <= 39.9)
        status = "Obesidade 2";
    else if(imc > 40)
        status = "Obesidade 3";
    else
        return false;

    return status;
};

let peso = 60;
let altura = 170;

console.log(statusImc(calcularImc(peso, altura)));