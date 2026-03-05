/****************************************************************************************
 * Objetivo: Arquivo responsável por realizar as validações das funções de calculos
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 25/02/2026
 * Versão 1.0
 ****************************************************************************************/

// FUNÇÕES PADRÕES
// Função que retorna um boolean com a validação simples de entrada de dados do tipo string
const validarEntradaDeString = function (string) {
    let stringInformada = String(string);

    if (stringInformada.trim() === "" || !isNaN(stringInformada))
        return false;
    else
        return true;
};

// Função que retorna um boolean com a validação simples de entrada de dados do tipo number
const validarEntradaDeNumber = function (numero) {
    let numeroInformado = Number(numero);

    if (numeroInformado === "" || isNaN(numeroInformado))
        return false;
    else
        return true;
};

// Função que retorna uma validação do tipo de calculadora escolhida
const validarTipoCalculadora = function(tipoCalculadora){
    let calculadoraInformada = String(tipoCalculadora).trim().toUpperCase();
    let calculadora = [
        "PAR/IMPAR", "IMPAR/PAR", "IMPAR OU PAR", "PAR OU IMPAR", "IMPAR E PAR", "PAR E IMPAR", "IMPAR", "PAR",
        "PAR/ÍMPAR", "ÍMPAR/PAR", "ÍMPAR OU PAR", "PAR OU ÍMPAR", "ÍMPAR E PAR", "PAR E ÍMPAR", "ÍMPAR",
        "IMC", "MÉDIA", "MEDIA", "TABUADA", "FATORIAL"
    ];

    if(calculadora.includes(calculadoraInformada))
        return true;
    else
        return false;
};

//Função que retorna se um número é inteiro ou não
const validarNumeroInteiro = function (numero) {
    let numeroInformado = Number(numero);

    if (Number.isInteger(numeroInformado))
        return true;
    else
        return false;
};

// Funções para comparar dois números e retornar (maior, menor e igual)
const maior = (numero1, numero2) => Number(numero1) > Number(numero2);
const menor = (numero1, numero2) => Number(numero1) < Number(numero2);
const igual = (numero1, numero2) => Number(numero1) === Number(numero2);

// Função que retorna a inserção sobre a medição de altura
const validarMedicaoAltura = function (tipoMedicao) {
    let medicaoInformada = tipoMedicao.trim().toUpperCase();
    let medicao = ["CM", "M", "CMS", "MS", "METRO", "METROS", "CENTÍMETRO", "CENTÍMETROS", "CENTIMETRO", "CENTIMETROS"];
    
    if (medicao.includes(medicaoInformada))
        return true;
    else
        return false;
};

// Função que retorna a validação de gênero
const validarGenero = function (genero) {
    let generoInformado = genero.trim().toUpperCase();
    let generoPessoa = ["MASCULINO", "HOMEM", "FEMININO", "MULHER"];

    if (generoPessoa.includes(generoInformado))
        return true;
    else
        return false;
};

// Função que retorna o tamanho da nota inserida
const validarTamanhoNota = function (nota) {
    let valorNota = Number(nota);

    if (valorNota >= 0 && valorNota <= 100)
        return true;
    else
        return false;
};

// Função que retorna a validação específica para a entrada de cálculos da tabuada
const validarNumeroParaTabuada = function (numero) {
    let numeroInformado = Number(numero);

    if (numeroInformado < 2 || numeroInformado > 100)
        return false;
    else
        return true;
};

//Exportação das funções
module.exports = {
    validarEntradaDeString,
    validarEntradaDeNumber,
    validarTipoCalculadora,
    validarNumeroInteiro,
    maior,
    menor,
    igual,
    validarMedicaoAltura,
    validarGenero,
    validarTamanhoNota,
    validarNumeroParaTabuada
};