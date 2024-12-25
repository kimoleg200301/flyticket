const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5000;
const client_port = 3000;
const ip = '192.168.18.12'; // для других устройств

app.use(cors({
  origin: 'http://localhost:3000', // клиентский домен
  // origin: `http://${ip}:${client_port}`,
  credentials: true, // позволяет передавать cookies
}));
app.use(express.json());
app.use(cookieParser());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flyticket',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
});

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt_token || req.headers['Authorization'];
  /*Логи*/
  console.log(token);
  /*--------*/
  if (!token) {
    return res.json({ message: 'Токен не предоставлен!' });
  }

  jwt.verify(token, 'G9rT@q4zW1x&vP8s', (err, decoded) => {
    if (err) {
      return res.json({ message: 'Токен не валидный, либо срок его действия истек!' });
    }
    req.user = decoded;
    if (req.user === undefined) {
      return res.json({ message:  'Данные токена не получены!' });
    }
    /*Логи*/
    console.log(`req.user = decoded (${decoded})`);
    /*--------*/
    next();
  });
}

function rightToSettings(req, res, next) {
  const role = req.user.role;
  req.right = role === 'admin';
  if (!req.right && req.body.page === 'SettingsPage') {
    return res.json({ message: 'Ошибка! У вас не имеется прав на настройки рейсов!' });
  }
  next();
} 

app.post('/', authenticateToken, rightToSettings, async function (req, res) {
  const [data] = await pool.query(`select * from flights ORDER BY id DESC`);
  const { username, role } = req.user;
  const processedData = {
    data: data,
    username: username,
    role: role,
    right: req.right,
  }
  console.log(processedData);
  return res.json(processedData);
});

app.post('/addFlight', authenticateToken, rightToSettings, async function (req, res) {
  const { id, isDelete, departure, arrival, date, time, flightNumber, economy, business, firstClass } = req.body;
  if (id !== 0) {
    if (isDelete) {
      await pool.query(`DELETE FROM flights WHERE id = ?`, [id]);
      return res.json({
        success: 'Рейс был успешно удален!'
      });
    }
    else {
      await pool.query(`UPDATE flights SET departure = ?, arrival = ?, date = ?, time = ?, flightNumber = ?, economy = ?, business = ?, firstClass = ? WHERE id = ?`, [departure, arrival, date, time, flightNumber, economy, business, firstClass, id]);
      return res.json({
        success: 'Рейс был успешно обновлен!'
      });
    }
  }
  // else if (id === 0) {
  //   return res.json({
  //     success: 'Рейс является неккоректным!'
  //   });
  // }
  else {
    if (departure && arrival && date && time && flightNumber && economy && business && firstClass) {
      if (departure !== arrival) {
        // тут реализовать запросы для проверки на существующее/добавление рейсов
        await pool.query(`insert into flights (departure, arrival, date, time, flightNumber, economy, business, firstClass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [departure, arrival, date, time, flightNumber, economy, business, firstClass]);
        return res.json({
          success: 'Рейс был успешно создан!'
        });
        console.log('addFlight: ' + id  + departure, arrival, date, time, flightNumber, economy, business, firstClass);
      }
      else {
        return res.json({
          message_error: 'Город выезда и въезда не может быть один!'
        });
      }
    }
    else {
      return res.json({
        message_error: 'Заполните все поля!'
      });
    }
    console.log('addFlight: ' + departure, arrival, date, time, flightNumber, economy, business, firstClass);
  }
});

async function getUser() {
  try {
    app.post('/auth', async (req, res) => {
      const { IIN, password } = req.body;
      const [data] = await pool.query(`select * from users where IIN = ?`, [IIN]);

      if (data.length > 0) {
        if (data[0].password === password) {
          const token = jwt.sign({ username: data[0].username, role: data[0].role }, 'G9rT@q4zW1x&vP8s', { expiresIn: '1h' });
          console.log(`Token: ${token}`);

          if (req.headers['user-agent'] && req.headers['user-agent'].includes('Mozilla')) {
            res.cookie('jwt_token', token, { httpOnly: true, sameSite: 'Strict', path: '/' });
            return res.json({
              success: `Поздравляем! Вы успешно авторизованы!`,
              username: `Ваш ИИН: ${IIN}`,
              password: `Ваш пароль: ${password}`
            });
          }
          else {
            return res.json({token});
          }
        }
        else {
          res.json({
            error: `Неверный пароль!`,
          });
        }
      }
      else {
        res.json({
          error: `ИИН не найден!`,
          message: 'IIN: ' + IIN,
        });
      }
    });
  } catch (error) {
    console.error('Ошибка при подключении к базе данных!', error);
    throw error;
  }
}

async function addUser() {
  //   await pool.query(`CREATE DATABASE IF NOT EXISTS flyticket;`);
  // console.log('База данных flyticket успешно создана!');
  // await pool.query(`CREATE TABLE flights (
  //   id INT PRIMARY key auto_increment,
  //   departure VARCHAR(150),
  //   arrival VARCHAR(150),
  //   date VARCHAR(50),
  //   time VARCHAR(50),
  //   flightNumber VARCHAR(10),
  //   economy VARCHAR(100),
  //   business VARCHAR(100),
  //   firstClass VARCHAR(100)
  //   );`);
  // await pool.query(`INSERT INTO flights (id, departure, arrival, date, time, flightNumber, economy, business, firstClass) VALUES 
  //   (1, 'Астана', 'Корея', '2023-11-10', '10:00', 'A1 234', '300', '40', '15'),
  //   (2, 'Астана', 'Казань', '2023-11-12', '13:30', 'A1 543', '350', '50', '10'),
  //   (3, 'Астана', 'Сочи', '2023-11-15', '17:00', 'A1 838', '350', '25', '5'),
  //   (4, 'Алматы', 'Москва', '2023-11-20', '08:45', 'A1 148', '200', '60', '20'),
  //   (5, 'Актау', 'Екатеринбург', '2023-11-22', '15:30', 'A1 455', '400', '10', '0'),
  //   (6, 'Шымкент', 'Сочи', '2023-11-25', '18:20', 'A1 980', '155', '50', '5'),
  //   (7, 'Астана', 'Новосибирск', '2023-11-30', '09:15', 'A1 148', '300', '40', '15'),
  //   (8, 'Алматы', 'Казань', '2023-12-02', '12:00', 'A1 732', '350', '50', '10'),
  //   (9, 'Алматы', 'Санкт-Петербург', '2023-12-05', '16:45', 'A1 590', '350', '25', '5'),
  //   (10, 'Шымкент', 'Москва', '2023-12-07', '20:30', 'A1 167', '200', '60', '20');`);
  // await pool.query(`create table users (
  //   id int primary key auto_increment,
  //   IIN varchar(12) not null unique,
  //   username varchar(255) not null,
  //   role varchar(255) not null,
  //   password varchar(255) not null
  //   );`);
  // console.log('Таблицы с данными были успешно сгенерированы!');

  try {
    app.post('/create_account', async (req, res) => {
      const { IIN, username, password, confirmPassword } = req.body;
      const [username_check] = await pool.query(`select username from users where username = ?`, [username]);
      const [IIN_check] = await pool.query(`select IIN from users where IIN = ?`, [IIN]);
      let role = 'client';
      console.log('IIN ' + IIN);
      console.log('IIN_check ' + IIN_check);

      if (password === confirmPassword && !username_check[0] && !IIN_check[0]) {
        if (IIN === '012345678912') { // под иином 012345678912 регистрируется админ
          role = 'admin';
        }
        const [role_column_check] = await pool.query(`select column_name from information_schema.columns where TABLE_SCHEMA = 'flyticket' and table_name = 'users' and column_name = 'role';`);
        if (role_column_check.length === 0) {
          await pool.query(`alter table users add column role varchar(255) not null`);
        } 
        const [data] = await pool.query(`insert into users (IIN, username, role, password) values (?, ?, ?, ?)`, [IIN, username, role, password]);
        res.json({
          result: true,
          message: `Аккаунт создан. Авторизуйтесь под новым аккаунтом! ${data[0]}`,
        });
      }
      else {
        res.json({
          message: 'Пароли не совпали, либо имя пользователя и ИИН уже имеются',
        })
      }
    }); 
  } catch (error) {
    console.error('Ошибка при подключении к базе данных!', error);
    throw error;
  }
}

getUser();
addUser();

app.listen(port);

