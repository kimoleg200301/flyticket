import React from 'react';
import '../css/LoginForm.css'; // Подключаем CSS
import Logo from '../icons/logo.svg';

const LoginForm: React.FC = () => {
    return (
        <div className="body_form">
        <div className="login-form">
            {/* Логотип */}
            <img src={Logo} alt="Логотип" className="w-90 h-90 mx-auto" />
            <h2>Вход</h2>
            <form action="login.php" method="POST">
                <div className="form-group">
                    <label htmlFor="username">ИИН</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        maxLength={12}
                        required
                        pattern="\d{12}"
                        placeholder="Введите ваш ИИН"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Войти</button>
                </div>
                <div className="form-footer">
                    Нет аккаунта? <a href="RegisterForm">Регистрация</a>
                </div>
            </form>
        </div>
        </div>
    );
};

export default LoginForm;
