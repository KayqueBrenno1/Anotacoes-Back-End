/* 
* Objetivo: Desenvolver uma aplicação para a empresa Viva Moda
* Autor: Kayque Almeida
* Data: 04/02/2026
* Versão: 1.0
*/

//Import da biblioteca de entrada de dados
const readline = require("readline");

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Receber o nome do cliete
entradaDeDados.question("Digite o nome do cliente: ", function(nome){
    nomeCliente = nome;

    //Receber o nome do produto comprado
    entradaDeDados.question("Digite o nome do produto: ", function(produto){
        nomeProduto = produto;

        //Receber o valor da compra
        entradaDeDados.question("Digite o valor da compra: ", function(valor){
            valorCompra = valor;

            //Receber a taxa de juros
            entradaDeDados.question("Digite o valor da taxa de juros sem (%): ", function(taxa){
                taxaJuros = taxa;

                //Receber o tempo de pagamento
                entradaDeDados.question("Digite o tempo de pagamento (Parcelas): ", function(parcelas){
                    tempoDePagamento = parcelas;

                    //Validação de entradas vazias, números em lugares de letras e vice-versa
                    if(nomeCliente == "" || nomeProduto == "" || valorCompra == "" || taxaJuros == "" || tempoDePagamento == ""){
                        console.log("Existem campos obrigatórios que não foram preenchidos");
                    }else if(isNaN(valorCompra) || isNaN(taxaJuros) || isNaN(tempoDePagamento)){
                        console.log("ERRO: Campos que são permitidos apenas números foram preenchidos com letras");
                    }else if(!isNaN(nomeCliente) || !isNaN(nomeProduto)){
                        console.log("ERRO: Existem números em campos que são permitidos apenas letras");
                    }else{
                        let valorTaxa = taxaJuros / 100;
                        let montante = Number(valorCompra) * (1 + Number(valorTaxa))**Number(tempoDePagamento);

                        console.log(montante.toFixed(2));
                    };
                });
            });
        });
    });
});