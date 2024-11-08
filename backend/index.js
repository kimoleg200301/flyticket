const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5000;
const ip = '192.168.31.245'; // для других устройств

app.use(cors({
  origin: 'http://localhost:3000', // клиентский домен
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
    req.username = decoded;
    /*Логи*/
    console.log(`req.username = decoded (${decoded})`);
    /*--------*/
    next();
  });
}

app.post('/', authenticateToken, async function (req, res) {
  const [data] = await pool.query(`select * from flights`);
  return res.json(data);
});

app.post('/flightDetailPage', authenticateToken, async function (req, res) {
  const [data] = await pool.query(`select * from flights`);
  const { username } = req.username;
  const processedData = data.map(flight => {
    return {
      ...flight,
      seats: {
        economy: flight.economy,
        business: flight.business,
        firstClass: flight.firstClass,
      },
      username
    }
  });
  console.log(processedData);
  return res.json(processedData);
});

async function getUser() {
  try {
    app.post('/auth', async (req, res) => {
      const { IIN, password } = req.body;
      const [data] = await pool.query(`select * from users where IIN = ?`, [IIN]);

      if (data.length > 0) {
        if (data[0].password === password) {
          const token = jwt.sign({ username: data[0].username }, 'G9rT@q4zW1x&vP8s', { expiresIn: '1h' });
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
      console.log('IIN' + IIN);
      console.log('IIN_check' + IIN_check);

      if (password === confirmPassword && !username_check[0] && !IIN_check[0]) {
        const [data] = await pool.query(`insert into users (IIN, username, password) values (?, ?, ?)`, [IIN, username, password]);
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

