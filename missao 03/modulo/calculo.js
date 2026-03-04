/****************************************************************************************
 * Objetivo: Arquivo responsável por realizar cálculo matemáticos
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 25/02/2026
 * Versão 1.0
 ****************************************************************************************/

//Funções para cálculos matemáticos básicos
const somar = (numero1, numero2) => Number(numero1) + Number(numero2);
const multiplicar = (numero1, numero2) => Number(numero1) * Number(numero2);
const dividir = (numero1, numero2) => Number(numero1) / Number(numero2);
//Transforma o numero em potencia
const elevar = (base, expoente)   => Number(base) ** Number(expoente);

//Função que calcula o IMC
const calcularImc = function (peso, altura, medicao) {
    let pesoInformado    = Number(peso.replace(",", "."));
    let alturaInformada  = Number(altura.replace(",", "."));
    let medicaoInformada = medicao.toUpperCase();
    let imc;

    if (medicaoInformada === "CM")
        alturaInformada = dividir(alturaInformada, 100);

    imc = Number((dividir(pesoInformado, elevar(alturaInformada, 2))).toFixed(2));
    
    return imc;
};

//Função que calcula a média final
const calcularMedia = function (valor1, valor2, valor3, valor4) {
    let nota1 = Number(valor1);
    let nota2 = Number(valor2);
    let nota3 = Number(valor3);
    let nota4 = Number(valor4);
    let mediaFinal;

    mediaFinal = Number((dividir(somar(somar(nota1, nota2), somar(nota3, nota4)), 4)).toFixed(2));
    
    return mediaFinal;
};

//Função que calcula a média recuperativa
const calcularMediaRecuperativa = function (valorMedia, valorRecuperacao) {
    let media = Number(valorMedia);
    let notaRecuperacao = Number(valorRecuperacao);
    let mediaExame;

    mediaExame = Number((dividir(somar(media, notaRecuperacao), 2)).toFixed(2));

    return mediaExame;
};

//Função que calcula o fatorial
const calcularFatorial = function (numero) {
    let fatorial = 1;
    let i = 1;

    while(i <= numero){
        fatorial *= 1;
        i++;
    };

    return fatorial;
};

// Função que calcula os números ímpares
const calcularImpares = function (numeroInicial, numeroFinal) {
    let numInicio = Number(numeroInicial);
    let numFim    = Number(numeroFinal);
    let lista  = "";
    let cont   = 0;
    let i = numInicio;

    while(i <= numFim){
        if(i % 2 !== 0){
            lista += i + "\n"; // adiciona o número na lista
            cont++; // aumenta o contador
        };
    };

    return lista + "|" + cont;
};

// Função que calcula os números pares
const calcularPares = function (numeroInicial, numeroFinal) {
    let numInicio = Number(numeroInicial);
    let numFim    = Number(numeroFinal);
    let lista  = "";
    let cont   = 0;
    let i = numInicio;

    while(i <= numFim){
        if(i % 2 === 0){
            lista += i + "\n"; // adiciona o número na lista
            cont++; // aumenta o contador
        };
    };

    return lista + "|" + cont;
};

//Exportar funções
module.exports = {
    somar,
    multiplicar,
    dividir,
    elevar,
    calcularImc,
    calcularMedia,
    calcularMediaRecuperativa,
    calcularFatorial,
    calcularImpares,
    calcularPares
};