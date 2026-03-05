/********************************************************************************
 * Objetivo: Manipular dados em ARRAY e JSON
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 0listaDeAlunos.length/03/2026
 * Versão: 1.0
********************************************************************************/

/* 
    [] -> representa um objeto do tipo ARRAY
    {} -> representa um objeto do tipo JSON

    Array -> É um espaço na memória para armazenar dados sem a necessidade de criar outros objetos
        Ex:
            let nome = "José"
            let nome2 = "Maria"
            let nome3 = "João"

                indices     0       1       2
            let nomes = ["José", "Maria", "João"]

    JSON -> É um espaço na memória para armazenar dados com CHAVE e VALOR
        Ex:
            let nome = "José"
            let telefone = "40028922"
            let email = "jose@gmail.com"

                            Chave   Valor   Chave         Valor     Chave       Valor
            let cliente = {"nome": "José", "telefone": "40028922", "email": "jose@gmail.com"}
*/

const listaDeAlunos = ["José", "Maria", "Luiz", "Antônio", "Carlos"];
const listaDeClientes = [];
const listaDeFornecedores = [];

const exibirDados = function(){
    //Exibe o objeto ARRAY com o seu contéudo
    console.log(listaDeAlunos);

    //Exibindo o tipo de dados de um indice
    console.log(typeof(listaDeAlunos[2]));

    //Exibe o objeto ARRAY em formato de tabela, mostrando indice e conteúdo
    console.table(listaDeAlunos);

    console.log(listaDeAlunos[3]);
    console.log(listaDeAlunos[0]);

    console.log(`O nome do aluno é: ${listaDeAlunos[0]}`);
    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`);
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`);
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`);
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`);
    
    //Usando o While
    console.log("\n********** Exemplo com While **********");
    let cont = 0;
    while(cont < listaDeAlunos.length){
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`);
        cont++
    };

    //Usando o FOR
    console.log("\n********** Exemplo com FOR **********");
    for(let contador = 0; contador < listaDeAlunos.length; contador++)
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`);

    //Usando FOR EACH
    console.log("\n********** Exemplo com FOR EACH **********");
    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno é: ${aluno}`);
    });

    //Usando o FOR OF
    console.log("\n********** Exemplo com FOR OF **********");
    for(aluno of listaDeAlunos)
        console.log(`O nome do aluno é: ${aluno}`);

    //Usando o FOR IN
    console.log("\n********** Exemplo com FOR IN **********");
    for(aluno2 in listaDeAlunos)
        console.log(`O nome do aluno é: ${listaDeAlunos[aluno2]}`);

    console.log(listaDeAlunos.length);

};

const manipularDados = function(){
    //Adicionando elementos de forma manual pelo indice
    listaDeClientes[0] = "José da Silva";
    listaDeClientes[1] = "Maria da Silva";
    listaDeClientes[2] = "Luiz da Silva";
    listaDeClientes[3] = "Ana da Silva";

    console.log(listaDeClientes);

    //Permite adicionar novos elementos no ARRAY, sempre no final
    listaDeFornecedores.push("Antônio");
    listaDeFornecedores.push("Caio");
    listaDeFornecedores.push("Luiz");
    listaDeFornecedores.push("Hugo", "Maria", "José", "André");

    console.log(listaDeFornecedores);
};

manipularDados()