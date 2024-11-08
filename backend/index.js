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
    return res.json({ message: 'Токен не предоставлен!', href_welcome: '../welcome.html' });
  }

  jwt.verify(token, 'G9rT@q4zW1x&vP8s', (err, decoded) => {
    if (err) {
      return res.json({ message: 'Токен не валидный, либо срок его действия истек!', href_welcome: '../welcome.html' });
    }
    req.user = decoded;
    /*Логи*/
    console.log(`req.user = decoded (${decoded})`);
    /*--------*/
    next();
  });
}

app.post('/', authenticateToken, async function (req, res) {
  const [data] = await pool.query(`select * from flights ORDER BY id DESC`);
  const { username, role } = req.user;
  const processedData = {
    data: data,
    username: username,
    role: role,
  }
  console.log(processedData);
  return res.json(processedData);
});

app.post('/addFlight', authenticateToken, async function (req, res) {
  const { id, isDelete, departure, arrival, date, time, flightNumber, economy, business, firstClass } = req.body;
  if (id !== 0) {
    if (isDelete) {
      await pool.query(`DELETE FROM flights WHERE id = ?`, [id]);
      res.json({
        success: 'Рейс был успешно удален!'
      });
    }
    else {
      await pool.query(`UPDATE flights SET departure = ?, arrival = ?, date = ?, time = ?, flightNumber = ?, economy = ?, business = ?, firstClass = ? WHERE id = ?`, [departure, arrival, date, time, flightNumber, economy, business, firstClass, id]);
      res.json({
        success: 'Рейс был успешно обновлен!'
      });
    }
  }
  else {
    if (departure && arrival && date && time && flightNumber && economy && business && firstClass) {
      if (departure !== arrival) {
        // тут реализовать запросы для проверки на существующее/добавление рейсов
        await pool.query(`insert into flights (departure, arrival, date, time, flightNumber, economy, business, firstClass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [departure, arrival, date, time, flightNumber, economy, business, firstClass]);
        res.json({
          success: 'Рейс был успешно создан!'
        });
        console.log('addFlight: ' + id  + departure, arrival, date, time, flightNumber, economy, business, firstClass);
      }
      else {
        res.json({
          message_error: 'Город выезда и въезда не может быть один!'
        });
      }
    }
    else {
      res.json({
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

