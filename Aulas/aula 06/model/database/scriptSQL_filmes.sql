#Permite criar um database
create database db_filmes_20261_b;

#Permite visualizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualizar todas as tabelas existentes dentro do database
show tables;

#Criar tabela
create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null,
    id_classificacao	int not null,
    
    #Relação entre Classificação e Filme
    constraint FK_CLASSIFICACAO_FILME
    foreign key (id_classificacao)
    references tbl_classificacao(id)
);

#Tabela Classificação
create table tbl_classificacao (
	id int not null auto_increment primary key,
    classificacao varchar(6) not null
);

#Tabela Sexo
create table tbl_sexo (
	id int not null auto_increment primary key,
    sexo varchar(20) not null,
    sigla varchar(3) not null
);

#Tabela Nacionalidade
create table tbl_nacionalidade (
	id int not null auto_increment primary key,
    nacionalidade varchar(90) not null,
    sigla varchar(4) not null
);

#Tabela Genero
create table tbl_genero (
	id int not null auto_increment primary key,
    genero varchar(30)
);

#Tabela Intermediaria Filme e Genero
create table tbl_genero_filme (
	id int not null auto_increment primary key,
    id_filme int not null,
    id_genero int not null,
    
    constraint FK_FILME_GENEROFILME
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_GENERO_GENEROFILME
    foreign key (id_genero)
    references tbl_genero(id)
);

#Tabela Atividade
create table tbl_atividade (
	id int not null auto_increment primary key,
    atividade varchar(40)
);

#Tabela Foto
create table tbl_foto (
	id int not null auto_increment primary key,
    foto_url varchar(255) not null
);

#Tabela Diretor
create table tbl_diretor (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    data_nascimento date not null,
    biografia text,
    id_sexo_diretor int not null,
    id_nacionalidade_diretor int not null,
    
    #Relação entre a Tabela de Sexo e Diretor
    constraint FK_SEXO_DIRETOR
    foreign key (id_sexo_diretor)
    references tbl_sexo(id),
    
    #Relação entre a Tabela Nacionalidade e Diretor
    constraint FK_NACIONALIDADE_DIRETOR
    foreign key (id_nacionalidade_diretor)
    references tbl_nacionalidade(id)
);

#Tabela Ator
create table tbl_ator (
	id 							int not null auto_increment primary key,
    nome 						varchar(100) not null,
    data_nascimento 			date not null,
    biografia 					text,
    id_sexo_ator 				int not null,
    id_nacionalidade_ator 		int not null,
    
    #Relação entre a Tabela de Sexo e Ator
    constraint FK_SEXO_ATOR
    foreign key (id_sexo_ator)
    references tbl_sexo(id),
    
    #Relação entre a Tabela Nacionalidade e Ator
    constraint FK_NACIONALIDADE_ATOR
    foreign key (id_nacionalidade_ator)
    references tbl_nacionalidade(id)
);

show tables;

select * from tbl_filme;