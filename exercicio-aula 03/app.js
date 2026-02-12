//Import da biblioteca de entrada de dados
const readline = require("readline");

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("----------------------------------------------------------------");
console.log("Seja Bem-Vindo, certifique-se as notas são entre 0 à 100");
//Entrada de dados do nome
entradaDeDados.question("Digite o nome do aluno: ", function (nome) {
    //Recebe o nome do aluno
    let nomeAluno = nome;

    //Entrada de dados da nota1
    entradaDeDados.question("Digite a nota1: ", function (valor1) {
        let nota1 = valor1;

        //Entrada de dados da nota1
        entradaDeDados.question("Digite a nota2: ", function (valor2) {
            let nota2 = valor2;

            //Entrada de dados da nota1
            entradaDeDados.question("Digite a nota3: ", function (valor3) {
                let nota3 = valor3;

                //Entrada de dados da nota1
                entradaDeDados.question("Digite a nota4: ", function (valor4) {
                    let nota4 = valor4;

                    console.log("----------------------------------------------------------------");

                    if (nomeAluno == "" || !isNaN(nomeAluno)) {
                        console.log("ERRO: Não é permitido numeros ou campo vazio.");
                        console.log("----------------------------------------------------------------");

                        entradaDeDados.close();
                    } else {
                        //Import da biblioteca de calculos de Média Escolar
                        let calculos = require("./modulo/calculos.js");

                        //Media do aluno
                        let media = calculos.calcularMedia(nota1, nota2, nota3, nota4);

                        //Validação dos status do aluno
                        let status = calculos.verificarStatus(media);

                        if (media) {
                            //Exibir na tela a média e o status do aluno
                            console.log("O aluno(a) " + nomeAluno + " teve a média final em " + media);
                            console.log(status);
                            console.log("----------------------------------------------------------------");

                            entradaDeDados.close();
                        } else {
                            console.log("ERRO: Não foi possível processar o cálculo.");
                            console.log("----------------------------------------------------------------");

                            entradaDeDados.close();
                        };
                    };
                });
            });
        });
    });
});