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

const exibirDados = function () {
	//Exibe o objeto ARRAY com o seu contéudo
	console.log(listaDeAlunos);

	//Exibindo o tipo de dados de um indice
	console.log(typeof listaDeAlunos[2]);

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
	while (cont < listaDeAlunos.length) {
		console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`);
		cont++;
	}

	//Usando o FOR
	console.log("\n********** Exemplo com FOR **********");
	for (let contador = 0; contador < listaDeAlunos.length; contador++)
		console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`);

	//Usando FOR EACH
	console.log("\n********** Exemplo com FOR EACH **********");
	listaDeAlunos.forEach(function (aluno) {
		console.log(`O nome do aluno é: ${aluno}`);
	});

	//Usando o FOR OF
	console.log("\n********** Exemplo com FOR OF **********");
	for (aluno of listaDeAlunos) console.log(`O nome do aluno é: ${aluno}`);

	//Usando o FOR IN
	console.log("\n********** Exemplo com FOR IN **********");
	for (aluno2 in listaDeAlunos)
		console.log(`O nome do aluno é: ${listaDeAlunos[aluno2]}`);

	console.log(listaDeAlunos.length);
};

const manipularDados = function () {
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

	console.table(listaDeFornecedores);

	//Permite adicionar novos elementos no ARRAY, sempre no INICIO
	//Após adicionar o elemento, ele reorganiza todos os outros itens
	listaDeFornecedores.unshift("Luciano");
	console.table(listaDeFornecedores);

	//Permite adicionar um novo elemento em uma determinada posição do ARRAY
	// splice(indice, qtdeDeElementos, "Novo conteúdo")
	listaDeFornecedores.splice(4, 0, "Bernardo");
	console.table(listaDeFornecedores);

	/* Permite remover um determinado conteudo com base no indice do
	  elemento do ARRAY */
	// splice(indice, quantidade de elementos a ser removido)
	listaDeFornecedores.splice(6, 1);
	console.table(listaDeFornecedores);

	//Permite remover o último elemento do ARRAY
	listaDeFornecedores.pop();
	console.table(listaDeFornecedores);

	//Permite remover o primeiro elemento do ARRAY
	//Após ele remover, irá reorganizar tpdos os elementos
	listaDeFornecedores.shift();
	console.table(listaDeFornecedores);
};

const removerNome = function (nome) {
	let nomeInformado = String(nome);
	let cont = 0;

	while (cont < listaDeAlunos.length) {
		let objeto = listaDeAlunos[cont];

		if (objeto === nomeInformado) {
			listaDeAlunos.splice(cont, 1);
		}
		cont++;
	}
	console.table(listaDeAlunos);
};

const removerItem = function (nome) {
	//indexOf() -> Retorna o indice referente ao conteúdo que está sendo pesquisado
	listaDeAlunos.splice(listaDeAlunos.indexOf(nome), 1);

	/* for(cont in listaDeAlunos){
		  if(nome == listaDeAlunos[cont]){
			  listaDeAlunos.splice(cont, 1);
			  
		  }
	  }; */
	console.table(listaDeAlunos);
};

const verificarItem = function (nome) {
	//Verifica se o conteúdo existe dentro do ARRAY e retorna (true/false)
	console.log(listaDeAlunos.includes(nome));
};

const manipularDadosJSON = function () {
	//Criando um objeto JSON
	//A estrutura do JSON é Chave (atributo): Valor(conteúdo)
	let aluno = { "id": 1, "nome": "José da Silva", "ra": 123456, "email": "jose@gmail.com" };

	//Exibe o objeto JSON
	console.log(aluno);
	console.table(aluno);

	//Exibe o conteúdo de um atributo do JSON
	console.log(aluno.nome);
	console.log(aluno.email);

	//Adicionar um atributo no JSON
	aluno.telefone = "40028922";
	aluno.data_nascimento = "29/02/2000";
	console.log(aluno);

	//Remove um atributo do JSON
	delete aluno.email;
	console.log(aluno);

	//Modificar um atributo do JSON
	aluno.ra = 123456789;
	console.log(aluno);

	//Criar um atributo mas deixar sem informações
	aluno.nota = null;
	console.log(aluno);
};

const cadastroDeProdutos = function () {
	let cores = [
		{ "id": 1, "cor": "Branco", "hexa": "#ffffff" }, //0
		{ "id": 2, "cor": "Preto", "hexa": "#000000" }, //1
		{ "id": 3, "cor": "Azul", "hexa": "#0000ff" }, //2
		{ "id": 4, "cor": "Amarelo", "hexa": "#ffff00" }, //3
		{ "id": 5, "cor": "Rosa", "hexa": "#ffb5c0" },//4
	];

	let marca = [
		{ "id": 1, "marca": "Dell", "telefone": "11 98447-0089", "email": "dell@gmail.com" }, //0
		{ "id": 2, "marca": "Pichau", "telefone": "11 98347-2380", "email": "pichau@gmail.com" }, //1
		{ "id": 3, "marca": "Mancer", "telefone": "11 92447-0877", "email": "mancer@gmail.com" }, //2
		{ "id": 4, "marca": "Redragon", "telefone": "11 96354-3456", "email": "redragon@gmail.com" }, //3
		{ "id": 5, "marca": "Positivo", "telefone": "11 93960-4539", "email": "positivo@gmail.com" }, //4
		{ "id": 6, "marca": "Nvidia", "telefone": "11 95645-3784", "email": "nvidia@gmail.com" }, //5
	];

	let produtos = [
		{
			"id": 1,
			"nome": "Monitor",
			"descricao": "Monitor de 27 polegadas",
			"valor": 1500,
			"quantidade": 20,
			"cor": [
				cores[0],
				cores[1]
			],
			"marca": [
				marca[0].marca
			]
		},
		{
			"id": 2,
			"nome": "Teclado",
			"descricao": "Teclado Mecânico RGB",
			"valor": 250,
			"quantidade": 500,
			"cor": cores,
			"marca": [
				marca[0].marca,
				marca[2].marca,
				marca[3].marca,
				marca[4].marca
			]
		},

		{
			"id": 3,
			"nome": "Mouse",
			"descricao": "Mouse Gamer RGB",
			"valor": 80,
			"quantidade": 160,
			"cor": [
				cores[0],
				cores[1],
				cores[4]
			],
			"marca": [
				marca[0].marca,
				marca[2].marca,
				marca[3].marca,
				marca[4].marca
			]
		}
	];

	console.log(produtos);
	console.log(produtos[0].cor);

	//Extrai o Produto, Quantidade e Valor
	produtos.forEach(function (itemProduto) {
		console.log("\n--------------------------------------------------");
		console.log(`Produto: ${itemProduto.nome}`);
		console.log(`Quantidade: ${itemProduto.quantidade}`);
		console.log(`Valor: ${itemProduto.valor}`);

		//Extrai a cor
		console.log("\nCor:");
		itemProduto.cor.forEach(function (cores) {
			console.log(`${cores.cor}`);
		});

		//Extrai a marca
		console.log("\nMarca:");
		itemProduto.marca.forEach(function (itemMarca) {
			console.log(`${itemMarca}`);
		});
	});

	//Filtrando produtos pelo nome
	/* console.log("\nExemplo de como pesquisar um produto pelo nome");

	let nomeProduto = "Monitor";

	produtos.forEach(function(itemProduto){
		if(String(nomeProduto).toUpperCase() == String(itemProduto.nome).toUpperCase())
			console.log(itemProduto);
	}); */

	//Filtrando produto pelo nome
	console.log("\nExemplo de como pesquisar um produto pela cor");

	let produtoCor = "amarelo"

	produtos.forEach(function(itemCor){

		itemCor.cor.forEach(function(cores){

			if(String(produtoCor).toUpperCase() == String(cores.cor).toUpperCase())
				console.log(itemCor);
		});
	});

	//console.log(produtos);
	//console.table(produtos);
	//console.log(cores[2].cor);

	/* cores.forEach(function (itemCor) {
		console.log(`O nome da cor é: ${itemCor.cor}`);
	}); */
};

//Exibir dados
cadastroDeProdutos()