/*************************************************************************
 * Objetivo: Arquivo responsável pelo processamento de calculos matemáticos
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 20/02/2026
 * Versão 1.0
 *************************************************************************/
//toLowerCase() -> Retorna uma String em minusculo
//toUpperCase() -> Retorna uma String em MAIUSCULO

//Exemplo de Função Anonima

//Função para calcular as 4 operações matemáticas
const calcular = function (numero1, numero2, operador) {
    let valor1 = Number(numero1);
    let valor2 = Number(numero2);
    let operadorMatematico = String(operador).toUpperCase();

    let resultado;

    //Processamento
    /* if(operadorMatematico == "SOMAR"){
        resultado = valor1 + valor2;
    }else if(operadorMatematico == "SUBTRAIR"){
        resultado = valor1 - valor2;
    }else if(operadorMatematico == "MULTIPLICAR"){
        resultado = valor1 * valor2;
    }else if(operadorMatematico == "DIVIDIR"){
        resultado = valor1 / valor2;
    }else{
        return false;
    }; */

    switch (operadorMatematico) {
        case "SOMAR":
            resultado = valor1 + valor2;
            break;
        case "SUBTRAIR":
            resultado = valor1 - valor2;
            break;
        case "MULTIPLICAR":
            resultado = valor1 * valor2;
            break;
        case "DIVIDIR":
            resultado = valor1 / valor2;
            break;
    };

    //Saída
    if(resultado != undefined){
        return resultado;
    } else{
        return false;
    };

};

//Testando a função
let result = calcular(50, 25, "Subtrair");
console.log(result);