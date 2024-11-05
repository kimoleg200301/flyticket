CREATE DATABASE flyticket;

use flyticket;

CREATE TABLE flights (
    id INT PRIMARY key auto_increment,
    departure VARCHAR(150),
    arrival VARCHAR(150),
    date VARCHAR(50),
    time VARCHAR(50),
    flightNumber VARCHAR(10),
    economy VARCHAR(100),
    business VARCHAR(100),
    firstClass VARCHAR(100)
);

INSERT INTO flights (id, departure, arrival, date, time, flightNumber, economy, business, firstClass) VALUES 
(1, 'Астана', 'Корея', '2023-11-10', '10:00', 'A1 234', '300', '40', '15'),
(2, 'Астана', 'Казань', '2023-11-12', '13:30', 'A1 543', '350', '50', '10'),
(3, 'Астана', 'Сочи', '2023-11-15', '17:00', 'A1 838', '350', '25', '5'),
(4, 'Алматы', 'Москва', '2023-11-20', '08:45', 'A1 148', '200', '60', '20'),
(5, 'Актау', 'Екатеринбург', '2023-11-22', '15:30', 'A1 455', '400', '10', '0'),
(6, 'Шымкент', 'Сочи', '2023-11-25', '18:20', 'A1 980', '155', '50', '5'),
(7, 'Астана', 'Новосибирск', '2023-11-30', '09:15', 'A1 148', '300', '40', '15'),
(8, '', 'Казань', '2023-12-02', '12:00', 'A1 732', '350', '50', '10'),
(9, 'Алматы', 'Санкт-Петербург', '2023-12-05', '16:45', 'A1 590', '350', '25', '5'),
(10, 'Шымкент', 'Москва', '2023-12-07', '20:30', 'A1 167', '200', '60', '20');

create table users (
	id int primary key auto_increment,
	IIN varchar(12) not null unique,
	username varchar(255) not null,
	password varchar(255) not null
);
