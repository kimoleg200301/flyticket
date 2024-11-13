import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/RegisterForm.css';
import Logo from '../icons/logo.svg';

interface FormData {
    IIN: string,
    username: string,
    password: string,
    confirmPassword: string,
}

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const [addUser, setAddUser] = useState<FormData>({
        IIN: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddUser({ ...addUser, [name]: value}); 
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/create_account", addUser);
            console.log("Данные были успешно отправлены: ", response.data);
            if (response.data.result == true) {
                alert(response.data.message);
                navigate('/login');
            }
            else {
                alert(response.data.message);
                return;
            }
        } catch (error) {
            console.error("Ошибка при отправке данных", error);
        }
    }

    return (
        <div className="body_form">
        <div className="registration-form">
        {/* Логотип */}
        <img src={Logo} alt="Логотип" className="w-90 h-90 mx-auto" />
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="IIN">ИИН</label>
                <input type="text" id="IIN" name="IIN" maxLength={12} required pattern="\d{12}" placeholder="Введите ваш ИИН" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="username">ФИО</label>
                <input type="text" id="username" name="username" required placeholder="Введите ваше ФИО" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" name="password" required placeholder="Введите пароль" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Подтвердите пароль" onChange={handleChange} />
            </div>
            <div className="form-group">
                <button type="submit">Зарегистрироваться</button>
            </div>
            <div className="form-footer">
                Уже есть аккаунт? <a href="login">Войти</a>
            </div>
        </form>
    </div>
    </div>
    );
}

export default RegisterForm;