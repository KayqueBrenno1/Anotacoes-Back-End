/* 
* Objetivo: Desenvolver uma aplicação para a empresa Viva Moda
* Autor: Kayque Brenno Ferreira Almeida
* Data: 04/02/2026
* Versão: 1.0
*/

//Import da biblioteca de entrada de dados
const readline = require("readline");

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Variável de validação de símbolos e quantidade mínima de caracteres
const verificadorSimbolos = /^[\p{L} ]{2,}$/u;

//Receber o nome do cliete
entradaDeDados.question("Digite o nome do cliente: ", function (nome) {
    let nomeCliente = nome;

    //Receber o nome do produto comprado
    entradaDeDados.question("Digite o nome do produto: ", function (produto) {
        let nomeProduto = produto;

        //Receber o valor da compra
        entradaDeDados.question("Digite o valor da compra: ", function (valor) {
            let valorCompra = Number(valor);

            //Receber a taxa de juros
            entradaDeDados.question("Digite o valor da taxa de juros sem (%): ", function (taxa) {
                let taxaJuros = Number(taxa) / 100;

                entradaDeDados.question("Escolha a forma de parcelamento: \n[1] Mês(es) \n[2] Ano(s) \nDigite 1 ou 2: ", function (parcelamento) {

                    //Validação dos números 1 ou 2 na forma de parcelamento
                    if (parcelamento < 1 || parcelamento > 2) {
                        console.log("Apenas 1 ou 2!");
                    } else {
                        let formaDeParcelamento = parcelamento;

                        //Entrada de dados da quantidade de parcelas
                        entradaDeDados.question("Digite a quantidade de parcelas: ", function (parcelas) {
                            let quantidadeParcelas = Number(parcelas);

                            //CONVERSAO DE ANOS PARA MESES
                            if (formaDeParcelamento == 2) {
                                quantidadeParcelas = quantidadeParcelas * 12;
                            };

                            //Calcular o valor da montante
                            let montante = (valorCompra * (1 + taxaJuros) ** quantidadeParcelas).toFixed(2);

                            //Calcular a diferenca entre a montante e o valor do produto
                            let diferenca = (montante - valorCompra).toFixed(2);

                            //Validação de entradas vazias, números em lugares de letras e vice-versa
                            if (nomeCliente == "" || nomeProduto == "" || valorCompra == "" || taxaJuros == "" || quantidadeParcelas == "") {
                                console.log("ERRO: Existem campos obrigatórios que não foram preenchidos");

                            } else if (isNaN(valorCompra) || isNaN(taxaJuros) || isNaN(quantidadeParcelas)) {
                                console.log("ERRO: Campos que permitem apenas números foram preenchidos com letras ou caracteres");

                            } else if (!isNaN(nomeCliente) || !verificadorSimbolos.test(nomeCliente) || !isNaN(nomeProduto) || !verificadorSimbolos.test(nomeProduto)) {
                                console.log("ERRO: Existem números ou caracteres em campos que permitem apenas letras");

                            } else {

                                //SAIDA DE DADOS
                                console.log("\n******************* Viva Moda *******************");
                                console.log("Muito obrigado por realizar a sua compra conosco Sr(a) " + nomeCliente);
                                console.log("A compra do produto " + nomeProduto + ", tem um valor de: R$" + valorCompra + ".");
                                console.log("A sua compra será parcelada em " + quantidadeParcelas + " vezes e o Sr(a) pagará: R$" + montante + ".");
                                console.log("O acréscimo realizado ao valor de: R$" + valorCompra + " será de R$" + diferenca + ".");
                                console.log("\nMuito obrigado por escolher a Viva Moda.");
                                console.log("*******************************************************");
                            };
                        });
                    };
                });
            });
        });
    });
});