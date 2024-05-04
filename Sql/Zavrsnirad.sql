use master;
go
drop database if exists tekucine2;
go
create database tekucine2;
go


use tekucine2;

create table proizvodjaci(
sifra int primary key identity(1,1),
naziv varchar(225) ,
link varchar(225)not null
);
create table proizvodi(
sifra int  primary key identity(1,1),
naziv varchar(225),
proizvodjac int
);

create table arome(
sifra int  primary key identity(1,1),
naziv varchar(225),
proizvod int,
vrsta varchar(225),
hladilo bit
);


alter table proizvodi add foreign key (proizvodjac) references proizvodjaci(sifra);
alter table arome add foreign key (proizvod) references proizvodi(sifra);

insert into proizvodjaci(naziv,link)
values
('Elfliq','https://www.elfliq.com/'),
('Pinky vape','https://www.puffkalica.hr/kategorija/e-tekucine/pinky-vape/'),
('Syrup','https://www.vapeclub.co.uk/e-liquids/syrup/'),
('Familiar','https://parilica.hr/familiar-elemonator-0mg-40ml.html'),
('Steam tank','https://parilica.hr/steam-tank'),
('Ripe Vapes','https://www.ripevapes.com/'),
('Baron Factory','https://www.vapeototal.net/en/baron-factory/');

insert into proizvodi(naziv,proizvodjac)
values('e-tekucina',1),('e-tekucina',2),('e-tekucina',3),('e-tekucina',4),('e-tekucina',5),('e-tekucina',6),
('e-tekucina',7);


insert into Arome(vrsta,naziv,proizvod,hladilo)
values('Desertna','Coco Blanco',1,0),
('Desertna','Puffter Eight',2,1),
('Desertna','Cotton Candy Ice',3,1),
('Desertna','Berry Pie',4,0),
('Duhanska','Apple Tobacco',5,0),
('Duhanska','Rasputin',6,0),
('Duhanska','Cream Tobacco',7,0),
('Duhanska','Tobee',1,0),
('Menthol','Spearmint',2,0),
('Menthol','Wood Berry',3,0),
('Menthol','Frosty',4,0),
('Menthol','For Rest',5,0),
('Vocna','Pink Lemonade',6,0),
('Vocna','Kiwi Passion',7,0),
('Vocna','Exorcist',1,0),
('Vocna','Banananana',2,0);



select * from arome;
select * from proizvodjaci;
select * from proizvodi;


