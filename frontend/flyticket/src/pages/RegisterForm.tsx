import React from 'react';
import '../css/RegisterForm.module.css';
import Logo from '../icons/logo.svg';

const RegisterForm: React.FC = () => {
    return (
        <div className="registration-form">
        {/* Логотип */}
        <img src={Logo} alt="Логотип" className="logo" />
        <h2>Регистрация</h2>
        <form action="register.php" method="POST">
            <div className="form-group">
                <label htmlFor="iin">ИИН</label>
                <input type="text" id="iin" name="iin" maxLength={12} required pattern="\d{12}" placeholder="Введите ваш ИИН" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" name="password" required placeholder="Введите пароль" />
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Подтвердите пароль</label>
                <input type="password" id="confirm-password" name="confirm-password" required placeholder="Подтвердите пароль" />
            </div>
            <div className="form-group">
                <button type="submit">Зарегистрироваться</button>
            </div>
            <div className="form-footer">
                Уже есть аккаунт? <a href="LoginForm">Войти</a>
            </div>
        </form>
    </div>
    );
}

export default RegisterForm;