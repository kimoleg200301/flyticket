import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthPageProps {
  url: string; // Указываем тип для пропа `url`
}

const AuthPage: React.FC<AuthPageProps> = ({ url }) => {
  return(
    <Router>
      <Routes>
        {url === '/login' ? <Route path={'/login'} element={<LoginForm />} /> : <Route path={'/register'} element={<RegisterForm />} />}
      </Routes>
    </Router>
  );
}

export default AuthPage;