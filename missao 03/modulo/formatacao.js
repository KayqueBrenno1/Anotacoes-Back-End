/********************************************************************************
 * Objetivo: Arquivo responsável pelas formatações e estruturas de saída de dados
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 25/02/2026
 * Versão: 1.0
********************************************************************************/

const { multiplicar } = require("./calculo");

//Função que reduz as possíveis entradas do tipo de calculadora para uma só
const formatarTipoDeCalculadora = function (tipoCalculadora) {
    let tipoInformada = String(tipo.toUpperCase());
    let calculadora;

    if (tipoInformada == "IMC")
        calculadora = "IMC";
    else if (tipoInformada == "MÉDIA" || tipoInformada == "MEDIA")
        calculadora = "MÉDIA";
    else if (tipoInformada == "TABUADA")
        calculadora = "CALCULADORA";
    else if (tipoInformada == "FATORIAL")
        calculadora = "FATORIAL";
    else
        calculadora = "PAR/ÍMPAR";
    
    return calculadora;
};

//Função que classifica o IMC de uma pessoa
const formatarClassificacaoImc = function (valorImc) {
    let imc = Number(valorImc);
    let classificacao;

    if (imc < 18.5)
        classificacao = "Abaixo do peso";
    else if (imc >= 18.5 && imc < 25)
        classificacao = "Peso normal";
    else if (imc >= 25 && imc < 30)
        classificacao = "Acima do peso (sobrepeso)";
    else if (imc >= 30 && imc < 35)
        classificacao = "Obesidade grau I";
    else if (imc >= 35 && imc < 40)
        classificacao = "Obesidade grau II";
    else
        classificacao = "Obesidade grau III";

    return classificacao;
};

//Função que define o gênero do lecionador
const formatarGeneroProfessor = function (genero) {
    let generoInformado = genero.trim().toUpperCase();
    let sexo;

    if (generoInformado === "MASCULINO" || generoInformado === "HOMEM")
        sexo = "Professor";
    else if(generoInformado === "FEMININO" || generoInformado === "MULHER")
        sexo = "Professora";
    else
        return false;


    return sexo;
};

//Função que define o gênero do aluno
const formatarGeneroAluno = function (genero) {
    let generoInformado = genero.trim().toUpperCase();
    let sexo;

    if (generoInformado === "MASCULINO" || generoInformado === "HOMEM")
        sexo = "O aluno";
    else if(generoInformado === "FEMININO" || generoInformado === "MULHER")
        sexo = "A aluna";
    else
        return false;


    return sexo;
};

//Função que classifica a média do aluno
const formatarMediaFinal = function (valorMedia) {
    let media = Number(valorMedia);
    let situacao;

    if (media >= 70)
        situacao = "aprovado";
    else if (media >= 50 && media < 70)
        situacao = "recuperação";
    else
        situacao = "reprovado";


    return situacao;
};

//Função que classifica a média recuperativa do aluno
const formatarMediaRecuperativa = function (valorMedia) {
    let media = Number(valorMedia);
    let situacao;

    if (media >= 60)
        situacao = "aprovado";
    else
        situacao = "reprovado";

    return situacao;
};

// Função que calcula e formata a tabuada
const formatarTabuada = function (tabuadaInicial, tabuadaFinal, contador, contadorFinal) {
    let tabInicial = Number(tabuadaInicial);
    let tabFinal = Number(tabuadaFinal);
    let contInicial = Number(contador);
    let contFinal = Number(contadorFinal);
    let resultado;

    let tbI = tabInicial;
    while(tbI <= tabFinal){
        resultado += `\nTabuada do [${tbI}]\n`;

        let cbI = contInicial;

        while(cbI <= contFinal){
            resultado += `${tbI} x ${cbI} = ${multiplicar(tbI, cbI)}\n`;
            cbI++
        };

        tbI++;
    };

    return resultado;
};

// Função que formata a expressão fatorial
const formatarExpressaoFatorial = function (numero) {
    let numeroFatorial = Number(numero);
    let expressao;

    let i = numeroFatorial;
    while(i >= 1){
        expressao += i;

        if(i > 1)
            expressao += "x";

        i--;
    };

    return expressao;
};

// Função que formata o resultado do cálculo de pares e ímpares
const formatarListaNumerosParesImpares = function (titulo, retornoCalculo) {
    let tituloInf = titulo.trim().toUpperCase();
    let partes = retornoCalculo.split("|");
    let lista = partes[0];
    let quantidade = partes[1];
    let texto = `${tituloInf}\n`;
    
    texto += lista;
    texto += `Quantidade de números encontrados: ${quantidade}\n`;

    return texto;
};

const formatarSaidaNumerosParImpar = function (tipo, par, impar) {
    let tipoSaida = String(tipo.trim().toUpperCase());
    let textoPares = String(par);
    let textoImpares = String(impar);
    let texto;
    
    if (tipoSaida === "PARES") {
        texto += `${textoPares}`;
    } else if (tipoSaida === "ÍMPARES" || tipoSaida === "IMPARES") {
        texto += `${textoImpares}`;
    } else if (tipoSaida === "AMBOS") {
        texto += `${textoPares}\n`;
        texto += `${textoImpares}`;
    } else {
        texto += "\nOpção inválida!";
    };

    return texto;
};



// Exportação das funções
module.exports = {
    formatarTipoDeCalculadora,
    formatarClassificacaoImc,
    formatarGeneroProfessor, 
    formatarGeneroAluno, 
    formatarMediaFinal,
    formatarMediaRecuperativa,
    formatarTabuada,
    formatarExpressaoFatorial,
    formatarListaNumerosParesImpares, 
    formatarSaidaNumerosParImpar
};