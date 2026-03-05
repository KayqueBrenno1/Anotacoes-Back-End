/**************************************************************************
 * Objetivo: Arquivo responsável por receber a entrada de dados
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 25/02/2026
 * Versão: 1.0
**************************************************************************/

// Import da biblioteca de entrada de dados
const readline = require("readline");

// Criação do objeto que guarda as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Import das bibliotecas de cálculos, formatação e validação
let calculos = require("./modulo/calculo.js");
let formatacao = require("./modulo/formatacao.js");
let validacao = require("./modulo/validacao.js");

// Entrada do tipo de calculadora que o usuário deseja utilizar
entradaDeDados.question("Qual calculadora você deseja utilizar? (IMC, Média, Tabuada, Fatorial ou Par/Ímpar): ", function (tipoCalculadora) {
    let calculadoraInformada  = tipoCalculadora.trim().toUpperCase();
    let validacaoCalculadora1 = validacao.validarEntradaDeString(calculadoraInformada);
    let validacaoCalculadora2 = validacao.validarTipoCalculadora(calculadoraInformada);

    if (validacaoCalculadora1 && validacaoCalculadora2) {
        let calculadora = formatacao.formatarTipoDeCalculadora(calculadoraInformada);
        
        if (calculadora === "IMC") {
            // Entrada do peso
            entradaDeDados.question("\nDigite o peso em kg: ", function (peso) {
                let pesoInformado = peso.replace(",", ".");
                let validacaoPeso = validacao.validarEntradaDeNumber(pesoInformado);

                // Validação do peso e entrada da medição
                if (validacaoPeso) {
                    entradaDeDados.question("Escolha se você usará (metros ou centímetros) para informar o peso: ", function (medicao) {
                        let medicaoInformada = medicao.trim().toUpperCase();
                        let medicaoValidada1 = validacao.validarEntradaDeString(medicaoInformada);
                        let medicaoValidada2 = validacao.validarMedicaoAltura(medicaoInformada);

                        // Validação da medição e entrada da altura
                        if (medicaoValidada1 && medicaoValidada2) {
                            entradaDeDados.question(`Digite a altura em ${medicaoInformada}: `, function (altura) {
                                let alturaInformada = altura.replace(",", ".");
                                let alturaValidada = validacao.validarEntradaDeNumber(alturaInformada);

                                //Calculo IMC e validacao altura
                                if (alturaValidada) {
                                    let resultadoImc = calculos.calcularImc(pesoInformado, alturaInformada, medicaoInformada);
                                    let classificacaoImc = formatacao.formatarClassificacaoImc(resultadoImc);

                                    console.log(`\nO resultado do IMC é: ${resultadoImc}`);
                                    console.log(`O indivíduo está: ${classificacaoImc}`);
                                } else {
                                    console.log("\nAltura inválida!");
                                };
                                entradaDeDados.close();
                            });
                        } else {
                            console.log("\nMedição inválida!");
                            entradaDeDados.close();
                        };
                    });
                } else {
                    console.log("\nPeso inválido!");
                    entradaDeDados.close();
                };
            });
        } else if (calculadora === "MÉDIA") {
            //Entrada do nome do professor
            entradaDeDados.question("\nDigite o nome do professor: ", function (nomeProfessor) {
                let nomeProfInf = nomeProfessor.trim();
                let nomeProfessorVal = validacao.validarEntradaDeString(nomeProfInf);

                //Entrada do gênero do professor
                if (nomeProfessorVal) {
                    entradaDeDados.question("Digite o gênero do professor (MASCULINO ou FEMININO): ", function (generoProfessor) {
                        let generoInformado = generoProfessor.trim();
                        let generoValidado1 = validacao.validarEntradaDeString(generoInformado);
                        let generoValidado2 = validacao.validarGenero(generoInformado);
                        let sexoProfessor = formatacao.formatarGeneroProfessor(generoProfessor);
                        
                        // Entrada do nome do aluno
                        if (generoValidado1 && generoValidado2) {
                            entradaDeDados.question("Digite o nome do aluno: ", function (nomeAluno) {
                                let nomeAlunoInformado = nomeAluno.trim();
                                let nomeAlunoValidado = validacao.validarEntradaDeString(nomeAlunoInformado);

                                // Entrada do gênero do aluno
                                if (nomeAlunoValidado) {
                                    entradaDeDados.question("Digite o gênero do aluno (MASCULINO ou FEMININO): ", function (generoAluno) {
                                        let generoAlunoInformado = generoAluno.trim();
                                        let generoAlunoVal1 = validacao.validarEntradaDeString(generoAlunoInformado);
                                        let generoAlunoVal2 = validacao.validarGenero(generoAlunoInformado);
                                        let sexoAluno = formatacao.formatarGeneroAluno(generoAlunoInformado);
                                        
                                        // Entrada do nome do curso
                                        if (generoAlunoVal1 && generoAlunoVal2) {
                                            entradaDeDados.question("Digite o nome do curso: ", function (nomeCurso) {
                                                let nomeCursoInformado = nomeCurso.trim();
                                                let nomeCursoValidado = validacao.validarEntradaDeString(nomeCursoInformado);

                                                // Entrada da disciplina
                                                if (nomeCursoValidado) {
                                                    entradaDeDados.question("Digite a disciplina: ", function (disciplina) {
                                                        let disciplinaInformada = disciplina.trim();
                                                        let disciplinaValidada = validacao.validarEntradaDeString(disciplinaInformada);

                                                        // Entrada e validação das notas
                                                        if (disciplinaValidada) {
                                                            console.log("\nAs notas devem ser entre 0 e 100.")
                                                            entradaDeDados.question("Digite a primeira nota: ", function (valor1) {
                                                                let nota1  = valor1.replace(",", ".");
                                                                let nota1Validacao1 = validacao.validarEntradaDeNumber(nota1);
                                                                let nota1Validacao2 = validacao.validarTamanhoNota(nota1);

                                                                if (nota1Validacao1 && nota1Validacao2) {
                                                                    entradaDeDados.question("Digite a segunda nota: ", function (valor2) {
                                                                        let nota2  = valor2.replace(",", ".");
                                                                        let nota2Validacao1 = validacao.validarEntradaDeNumber(nota2);
                                                                        let nota2Validacao2 = validacao.validarTamanhoNota(nota2);

                                                                        if (nota2Validacao1 && nota2Validacao2) {
                                                                            entradaDeDados.question("Digite a terceira nota: ", function (valor3) {
                                                                                let nota3  = valor3.replace(",", ".");
                                                                                let nota3Validacao1 = validacao.validarEntradaDeNumber(nota3);
                                                                                let nota3Validacao2 = validacao.validarTamanhoNota(nota3);

                                                                                if (nota3Validacao1 && nota3Validacao2) {
                                                                                    entradaDeDados.question("Digite a quarta nota: ", function (valor4) {
                                                                                        let nota4  = valor4.replace(",", ".");
                                                                                        let nota4Validacao1 = validacao.validarEntradaDeNumber(nota4);
                                                                                        let nota4Validacao2 = validacao.validarTamanhoNota(nota4);

                                                                                        if (nota4Validacao1 && nota4Validacao2) {
                                                                                            let mediaFinal = calculos.calcularMedia(nota1, nota2, nota3, nota4);
                                                                                            let situacao = formatacao.formatarMediaFinal(mediaFinal);

                                                                                            if (situacao === "aprovado" || situacao === "reprovado") {
                                                                                                console.log(`\n${sexoAluno} ${nomeAluno} foi ${situacao} na disciplina ${disciplina}.`);
                                                                                                console.log(`Curso: ${nomeCurso}`);
                                                                                                console.log(`${sexoProfessor}: ${nomeProfessor}`);
                                                                                                console.log(`Notas: ${nota1}, ${nota2}, ${nota3} e ${nota4}.`);
                                                                                                console.log(`Média final: ${mediaFinal}`);
                                                                                                entradaDeDados.close();

                                                                                            } else if (situacao === "recuperação") {
                                                                                                entradaDeDados.question("Digite a nota da recuperação: ", function (notaRecuperacao) {
                                                                                                    let notaRecInformada = notaRecuperacao.replace(",", ".");
                                                                                                    let notaRecValidada1 = validacao.validarEntradaDeNumber(notaRecInformada);
                                                                                                    let notaRecValidada2 = validacao.validarTamanhoNota(notaRecInformada);

                                                                                                    if (notaRecValidada1 && notaRecValidada2) {
                                                                                                        let mediaRecuperacao = calculos.calcularMediaRecuperativa(mediaFinal, notaRecInformada);
                                                                                                        let situacaoFinal = formatacao.formatarMediaRecuperativa(mediaRecuperacao);

                                                                                                        console.log(`\nO ${sexoAluno} ${nomeAluno} foi ${situacaoFinal} na disciplina ${disciplina}.`);
                                                                                                        console.log(`Curso: ${nomeCurso}`);
                                                                                                        console.log(`${sexoProfessor}: ${nomeProfessor}`);
                                                                                                        console.log(`Notas: ${nota1}, ${nota2}, ${nota3}, ${nota4} e ${notaRecInformada}.`);
                                                                                                        console.log(`Média final: ${mediaFinal}`);
                                                                                                        console.log(`Média final do exame: ${mediaRecuperacao}`);
                                                                                                    } else {
                                                                                                        console.log("Nota de recuperação inválida!");
                                                                                                        entradaDeDados.close();
                                                                                                    };
                                                                                                    entradaDeDados.close();
                                                                                                });
                                                                                            } else {
                                                                                                console.log(texto);
                                                                                            };
                                                                                        } else {
                                                                                            console.log("\nNota 4 inválida!");
                                                                                            entradaDeDados.close();
                                                                                        };
                                                                                    });
                                                                                } else {
                                                                                    console.log("\nNota 3 inválida!");
                                                                                    entradaDeDados.close();
                                                                                };
                                                                            });
                                                                        } else {
                                                                            console.log("\nNota 2 inválida!");
                                                                            entradaDeDados.close();
                                                                        };
                                                                    });
                                                                } else {
                                                                    console.log("\nNota 1 inválida!");
                                                                    entradaDeDados.close();
                                                                };
                                                            });
                                                        } else {
                                                            console.log("\nDisciplina inválida!");
                                                            entradaDeDados.close();
                                                        };
                                                    });
                                                } else {
                                                    console.log("\nNome do curso inválido!");
                                                    entradaDeDados.close();
                                                };
                                            });
                                        } else {
                                            console.log("\nGênero inserido inválido!");
                                            entradaDeDados.close();
                                        };
                                    });
                                } else {
                                    console.log("\nNome do aluno inválido!");
                                    entradaDeDados.close();
                                };
                            });
                        } else {
                            console.log("\nGênero inserido inválido!");
                            entradaDeDados.close();
                        };
                    });
                } else {
                    console.log("\nPermitido a entrada somente de letras!");
                    entradaDeDados.close();
                };
            });
        } else if (calculadora === "TABUADA") {
            // Entrada do número para a primeira tabuada
            entradaDeDados.question("\nDigite um número para ser a primeira tabuada. Exceto 1: ", function (numero) {
                let numero1Informado = numero.trim();
                let numero1Val1 = validacao.validarEntradaDeNumber(numero1Informado);
                let numero1Val2 = validacao.validarNumeroParaTabuada(numero1Informado);

                // Validação do número e entrada do segundo número para a tabuada
                if (numero1Val1 && numero1Val2) {
                    entradaDeDados.question(`Digite um número maior que ${numero1Informado} para ser a tabuada final: `, function (numero2) {
                        let numero2Informado = numero2.trim();
                        let numero2Val1 = validacao.validarEntradaDeNumber(numero2Informado);
                        let numero2Val2 = validacao.validarNumeroParaTabuada(numero2Informado);
                        let numero2Val3 = validacao.maior(numero2Informado, numero1Informado);

                        // Validação do segundo número e entrada do contador para a tabuada
                        if (numero2Val1 && numero2Val2 && numero2Val3) {
                            entradaDeDados.question("Digite um número para ser o primeiro contador da tabuada: ", function (multiplicador) {
                                let contador1Informado = multiplicador.trim();
                                let contador1Val1 = validacao.validarEntradaDeNumber(contador1Informado);
                                let contador1Val2 = validacao.maior(contador1Informado, -1);

                                // Validação do contador e entrada do contador final para a tabuada
                                if (contador1Val1 && contador1Val2) {
                                    entradaDeDados.question("Digite um número para ser o contador final da tabuada: ", function (contadorFinal) {
                                        let contador2Informado = contadorFinal.trim();
                                        let contador2Val1 = validacao.validarEntradaDeNumber(contador2Informado);
                                        let contador2Val2 = validacao.maior(contador2Informado, contador1Informado);

                                        // Validação do contador final e cálculo da tabuada
                                        if (contador2Val1 && contador2Val2) {
                                            let resultadoTabuada = formatacao.formatarTabuada(numero1Informado, numero2Informado, contador1Informado, contador2Informado);

                                            console.log(`\nTabuada de ${numero1Informado} a ${numero2Informado} sequenciada de ${contador1Informado} a ${contador2Informado}:`);
                                            console.log(resultadoTabuada);
                                        } else {
                                            console.log("\nNúmero inválido ou menor que o primeiro contador!");
                                        };
                                        entradaDeDados.close();
                                    });
                                } else {
                                    console.log("\nNúmero inválido ou menor que zero!");
                                    entradaDeDados.close();
                                };
                            });
                        } else {
                            console.log("\nNúmero inválido ou menor que o primeiro!");
                            entradaDeDados.close();
                        };
                    });
                } else {
                    console.log("\nNúmero inválido!");
                    entradaDeDados.close();
                };
            });
        } else if (calculadora === "FATORIAL") {
            // Entrada do número para o cálculo do fatorial
            entradaDeDados.question("\nDigite um número inteiro maior que 1 para calcular o fatorial: ", function (numeroFatorial) {
                let numeroFatInformado = numeroFatorial.trim().replaceAll("!", "");
                let numeroFatorialVal1 = validacao.validarEntradaDeNumber(numeroFatInformado);
                let numeroFatorialVal2 = validacao.validarNumeroInteiro(numeroFatInformado);
                let numeroFatorialVal3 = validacao.maior(numeroFatInformado, 1);

                // Validação do número para o cálculo do fatorial
                if (numeroFatorialVal1 && numeroFatorialVal2 && numeroFatorialVal3) {
                    let resultadoFat = calculos.calcularFatorial(numeroFatInformado);
                    let expressao = formatacao.formatarExpressaoFatorial(numeroFatInformado);

                    console.log(`\nFatorial de ${numeroFatInformado} é ${expressao} = ${resultadoFat}`);
                } else {
                    console.log("\nDigite apenas números maior que 1 e números inteiros");
                };
                entradaDeDados.close();
            });
        } else {
            // Entrada do número inicial para o cálculo de pares e ímpares
            entradaDeDados.question("\nDigite o Número Inicial (0 até 500): ", function (numeroInicial) {
                let numeroInicialInformado = numeroInicial.trim();
                let numeroIniValidado1 = validacao.validarEntradaDeNumber(numeroInicialInformado);
                let numeroIniValidado2 = validacao.validarNumeroInteiro(numeroInicialInformado);
                let numeroIniValidado3 = validacao.maior(numeroInicialInformado, -1);
                let numeroIniValidado4 = validacao.menor(numeroInicialInformado, 501);

                // Validação do número inicial e entrada do número final para o cálculo de pares e ímpares
                if (numeroIniValidado1 && numeroIniValidado2 && numeroIniValidado3 && numeroIniValidado4) {
                    entradaDeDados.question("Digite o Número Final (100 até 1000): ", function (numeroFinal) {
                        let numeroFimInformado = numeroFinal.trim();
                        let numeroFimValidado1 = validacao.validarEntradaDeNumber(numeroFimInformado);
                        let numeroFimValidado2 = validacao.validarNumeroInteiro(numeroFimInformado);
                        let numeroFimValidado3 = validacao.maior(numeroFimInformado, 99);
                        let numeroFimValidado4 = validacao.menor(numeroFimInformado, 1001);
                        let numeroFimValidado5 = validacao.igual(numeroFimInformado, numeroInicialInformado);

                        // Validação do número final e entrada do tipo de separação para o cálculo de pares e ímpares
                        if (numeroFimValidado1 && numeroFimValidado2 && numeroFimValidado3 && numeroFimValidado4 && !numeroFimValidado5) {
                            entradaDeDados.question("\nVocê deseja calcular PARES, ÍMPARES ou AMBOS? ", function (tipoSeparacao) {
                                let tipo = tipoSeparacao.trim();
                                let tipoVal = validacao.validarEntradaDeString(tipo);

                                if (tipoVal) {
                                    let retornoPar = calculos.calcularPares(numeroInicialInformado, numeroFimInformado);
                                    let retornoImp = calculos.calcularImpares(numeroInicialInformado, numeroFimInformado);
                                    let textoPares = formatacao.formatarListaNumerosParesImpares("Lista de números Pares", retornoPar);
                                    let textoImpares = formatacao.formatarListaNumerosParesImpares("Lista de números Ímpares", retornoImp);
                                    let textoFinal = formatacao.formatarSaidaNumerosParImpar(tipo, textoPares, textoImpares);

                                    console.log(textoFinal);
                                } else {
                                    console.log("\nProibido números ou campos vazios!");
                                };
                                entradaDeDados.close();
                            });
                        } else {
                            console.log("\nNúmero final inválido! Verifique se preencheu corretamente.");
                            entradaDeDados.close();
                        };
                    });
                } else {
                    console.log("\nNúmero inicial inválido! Verifique se preencheu corretamente.");
                    entradaDeDados.close();
                };
            });
        };
    } else {
        console.log("\nTipo de calculadora inexistente!");
        entradaDeDados.close();
    };
});