/*************************************************************************
 * Objetivo: Arquivo responsável pelo processamento de calculos matemáticos
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 20/02/2026
 * Versão 1.0
 *************************************************************************/
//toLowerCase() -> Retorna uma String em minusculo
//toUpperCase() -> Retorna uma String em MAIUSCULO

//Exemplo de Função Anonima

const validarDados = function (numero1, numero2, operador) {
    let n1 = Number(numero1);
    let n2 = Number(numero2);
    let tipo = String(operador);

    if (n1 == "" || isNaN(n1) || n2 == "" || isNaN(n2) || operador == "") {
        return false;
    } else {
        return true;
    };
}
//Função para calcular as 4 operações matemáticas
const calcular = function (numero1, numero2, operador) {
    let valor1 = Number(numero1);
    let valor2 = Number(numero2);
    let operadorMatematico = String(operador).toUpperCase();

    let resultado;

    //Processamento
    /* if(operadorMatematico == "SOMAR")
        resultado = valor1 + valor2;
    else if(operadorMatematico == "SUBTRAIR")
        resultado = valor1 - valor2;
    else if(operadorMatematico == "MULTIPLICAR")
        resultado = valor1 * valor2;
    else if(operadorMatematico == "DIVIDIR")
        resultado = valor1 / valor2;
    else
        return false;
    */

    switch (operadorMatematico) {
        case "SOMAR":
            resultado = somar(valor1, valor2);
            break;
        case "SUBTRAIR":
            resultado = subtrair(valor1, valor2);
            break;
        case "MULTIPLICAR":
            resultado = multiplicar(valor1, valor2);
            break;
        case "DIVIDIR":
            resultado = dividir(valor1, valor2);
            break;
    };

    //Saída
    if (resultado != undefined) {
        return resultado;
    } else {
        return false;
    };

};

//Função baseada em formato de seta (ARROW FUNCTION)
const somar = (numero1, numero2) => Number(numero1) + Number(numero2);
const subtrair = (numero1, numero2) => Number(numero1) - Number(numero2);
const multiplicar = (numero1, numero2) => Number(numero1) * Number(numero2);
const dividir = (numero1, numero2) => Number(numero1) / Number(numero2);

module.exports = {
    calcular,
    somar,
    subtrair,
    multiplicar,
    dividir,
    validarDados
};