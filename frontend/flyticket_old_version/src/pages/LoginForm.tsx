import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginForm.css'; // Подключаем CSS
import Logo from '../icons/logo.svg';

interface FormData {
    IIN: string,
    password: string
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState<FormData>({
        IIN: '',
        password: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuth({ ...auth, [name]: value}); 
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth", auth, {
                withCredentials: true,
            });
            if (response.data.success) {
                navigate('/');
            }
            else {
                alert(`${response.data.message}, ${response.data.error}`);
            }
        } catch (error) {
            console.error("Ошибка при отправке данных", error);
        }
    }

    return (
        <div className="body_form">
        <div className="login-form">
            {/* Логотип */}
            <img src={Logo} alt="Логотип" className="w-90 h-90 mx-auto" />
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="IIN">ИИН</label>
                    <input
                        type="text"
                        id="IIN"
                        name="IIN"
                        maxLength={12}
                        required
                        pattern="\d{12}"
                        placeholder="Введите ваш ИИН"
                        onChange={handleChange}
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
                        onChange={handleChange}
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
