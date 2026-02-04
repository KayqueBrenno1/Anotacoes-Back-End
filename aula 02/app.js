/* 
* Objetivo: Projeto para realizar o calculo de médias escolares
* Autor: Kayque Almeida
* Data: 29/01/2026
* Versão: 1.0
*/

/* 
    Tipos de criação de variáveis:

    var -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação hoje é considerada mais antiga,
            é provavel que seja encontrada apenas em projetos mais antigos.
            Dica: Caso você precise utilizar o var, recomenda-se 
            que seja utilizado apenas em escopo global.

    let -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação é realizada somente escopo 
            local, ou seja, dentro do bloco de programação { }.
            Esse tipo de variável deixa de existir ao término
            do bloco.

    const -> Permite criar um espaço em memória do tipo constante,
              ou seja, esse conteúdo não poderá sofrer mudanças durante
              o projeto.
              Dica: Se possível você pode criar essa const escrita em 
              MAIUSCULO para facilitar a sua utilização. Pode ser criada 
              de forma local ou global.

    Operadores de comparação

        ==  -> Permite a comparação de dois conteúdos
        !=  -> Permite comparar a diferença de dois conteúdos
        <   -> Permite validar o valor menor
        >   -> Permite validar o valor maior
        <=  -> Permite validar se o valor é menor ou igual
        >=  -> Permite validar se o valor é maior ou igual
        === -> Permite comparar a igualdade dos conteúdos e a
                igualdade da tipagem de dados
        !== -> Permite comparar a diferença de conteúdos e a 
                igualdade de tipagem de dados
        ==! -> Permite comparar a igualdade de conteúdos e a 
                diferença de tipagem de dados

    Tipos de operadores lógicos
        E -> AND -> &&
        OU -> OR -> ||
        NAO -> NOT -> !
*/

//Import da biblioteca de entrada de dados
const readline = require("readline");

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Entrada de dados do nome
entradaDeDados.question("Digite o nome do aluno: ", function(nome){
    //Recebe o nome do aluno
    let nomeAluno = nome;

    //Entrada de dados da nota1
    entradaDeDados.question("Digite a nota1: ", function(valor1){
        let nota1 = valor1;

        //Entrada de dados da nota1
        entradaDeDados.question("Digite a nota2: ", function(valor2){
            let nota2 = valor2;

            //Entrada de dados da nota1
            entradaDeDados.question("Digite a nota3: ", function(valor3){
                let nota3 = valor3;

                //Entrada de dados da nota1
                entradaDeDados.question("Digite a nota4: ", function(valor4){
                    let nota4 = valor4;

                    console.log("----------------------------------------------------------------");

                    //Validação de entrada vazia, notas menores que 0 e notas maiores que 100
                    //isNaN() -> Permite a validação de números ou letras
                    if(nomeAluno == "" || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == ""){
                        console.log("ERRO: Existem campos obrigatórios que não foram preenchidos.");
                    }else if(nota1 < 0 || nota2 < 0 || nota3 < 0 || nota4 < 0){
                        console.log("Não é permitido nota menor que 0 e maior que 100");
                    }else if(nota1 > 100 || nota2 > 100 || nota3 > 100 || nota4 > 100){
                        console.log("Não é permitido nota menor que 0 e maior que 100");
                    }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                        console.log("ERRO: Somente números são permitidos na entrada de notas");
                    };
                });
            });
        });
    });
});