/************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de calculos de Média Escolar
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 11/02/2026
 * Versão: 1.0
 ************************************************************************************************/

//Função para calcular médias das notas
function calcularMedia(valor1, valor2, valor3, valor4) {

    let nota1 = Number(valor1);
    let nota2 = Number(valor2);
    let nota3 = Number(valor3);
    let nota4 = Number(valor4);

    if (valor1 == "" || valor1 < 0 || valor1 > 100 || isNaN(valor1) ||
        valor2 == "" || valor2 < 0 || valor2 > 100 || isNaN(valor2) ||
        valor3 == "" || valor3 < 0 || valor3 > 100 || isNaN(valor3) ||
        valor4 == "" || valor4 < 0 || valor4 > 100 || isNaN(valor4)) {
        return false;
    } else {
        let somarNotas = nota1 + nota2 + nota3 + nota4;
        let media = somarNotas / 4;

        return Number(media.toFixed(2));
    };
};

//Função para verificar o status do aluno
function verificarStatus(verificar) {
    let mediaEscolar = verificar;
    let statusAluno;

    if (mediaEscolar) {
        if (mediaEscolar > 70) {
            statusAluno = "Parabéns o aluno(a) foi aprovado!!";
        } else if (mediaEscolar < 50) {
            statusAluno = "Que pena! O aluno(a) foi reprovado.";
        } else {
            statusAluno = "Bola na trave!! O aluno(a) ficou de recuperação.";
        };
        return statusAluno;
    } else {
        return false;
    };
};

module.exports = {
    calcularMedia,
    verificarStatus
};