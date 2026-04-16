/************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de calculos financeiros
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 11/02/2026
 * Versão: 1.0
 ************************************************************************************************/

//Função para retornar o percentual de um número
function calcularPercentual(numero) {
    //Recebe o numero encaminhado
    let numeroPercentual = Number(numero);

    //Validação de entrada vazia, menor ou igual a zero e de caracter
    if (numero == "" || numero <= 0 || isNaN(numero)) {
        return false
    } else {
        //Calcula o percentual do numero
        let percentual = numeroPercentual / 100;

        return Number(percentual.toFixed(2));
    };
};

//Função para retornar o montante referente a juros composto
function calcularJurosComposto(valor, taxa, parcelas) {

    //Recebe os valores dos argumentos e converte em número
    let valorPrincipal = Number(valor);
    let taxaJuros = Number(taxa);
    let quantidadeParcelas = Number(parcelas);

    //Validação de vazio ou de caracteres
    if (valor == "" || isNaN(valor) || valor <= 0 || parcelas == "" || isNaN(parcelas) || parcelas <= 0) {
        return false;
    } else {
        //Chama a função para retornar o percentual da taxa
        let percentual = calcularPercentual(taxaJuros);

        if (percentual) {
            //Calculo
            let montante = valorPrincipal * ((1 + percentual) ** quantidadeParcelas);

            return Number(montante.toFixed(2));
        };
    };
};

//Tornando as funções públicas
module.exports = {
    calcularPercentual,
    calcularJurosComposto
};