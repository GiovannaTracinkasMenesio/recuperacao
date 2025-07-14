create database livraria_rec;
use livraria_rec;

create table autor(
idAutor int not null primary key  auto_increment,
nome varchar(40)
);

create table genero (
idGenero int not null primary key  auto_increment,
tipo varchar(20)
);

create table livro (
idLivro int  not null primary key auto_increment,
titulo varchar(45) not null,
precoCompra decimal(3,2) not null,
precoVenda decimal(3,2) not null,
qtdDisponivel int not null,
fkAutor int,
fkGenero int not null,
foreign key (fkAutor) references autor(idAutor),
foreign key (fkGenero) references genero(idGenero)
);

insert into genero (tipo)
values ('Poesia'),
('Horror'),
('Romance'),
('Fantasia');

