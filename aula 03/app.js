/*******************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos de Juros utilizando
    Funções para modularizar o codigo
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 11/02/2026
 * Versão: 1.0
 *******************************************************************/

//Import da biblioteca do readline
const readline = require("readline");

//Criando o objeto de entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Entrada do nome do cliente
entradaDeDados.question("Digite o nome do cliente: ", function (nome) {
    let nomeCliente = nome;

    entradaDeDados.question("Digite o nome do Produto: ", function (produto) {
        let nomeProduto = produto;

        entradaDeDados.question("Digite o valor da compra: ", function (valor) {
            let valorCompra = valor;

            entradaDeDados.question("Digite a taxa de juros: ", function (taxa) {
                let taxaJuros = taxa;

                entradaDeDados.question("Digite a quantidade de parcelas: ", function (parcelas) {
                    let quantidadeParcelas = parcelas;

                    //Import da biblioteca de calculos financeiros
                    let calculos = require("./modulo/calculos.js");

                    //Chama a função para calcular o valor da montante
                    let montante = calculos.calcularJurosComposto(valorCompra, taxaJuros, quantidadeParcelas);

                    //Validação para verificar se o calculo foi realizado
                    if (montante) {
                        console.log("O valor final é: " + montante);
                    } else {
                        console.log("ERRO: Não foi possível processar o cálculo.");
                        entradaDeDados.close();
                    };
                });
            });
        });
    });
});