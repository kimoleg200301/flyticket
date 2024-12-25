// Header.tsx
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';  // Font Awesome иконка
import Logo from '../icons/logo.svg';

interface Token {
  username: string;
  role: string;
}

const Header: React.FC<Token> = ({username, role}) => {
  const [isClickedUser, setIsClickedUser] = useState<boolean>(false);
  
  const userClick = () => {
    if (isClickedUser) {
      setIsClickedUser(false);
    }
    else {
      setIsClickedUser(true);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-14 flex items-center justify-between bg-customGray p-4 shadow-md z-40 select-none">
      {/* Логотип */}
      <div className='animate-fadeIn text-black text-xl font-bold h-50 pr-2 bg-black bg-opacity-0 hover:bg-opacity-5 transition-colors duration-150 cursor-pointer rounded-xl'>
        <a href='/'><img src={Logo} alt="Логотип" className="w-50 h-50 inline-block" /><span>flyticket</span></a>
      </div>

      {/* User */}
      <div onClick={userClick} className={`animate-fadeIn bg-black ${isClickedUser ? 'bg-opacity-5' : 'bg-opacity-0'} p-2 hover:bg-opacity-5 transition-colors duration-150 p-2 cursor-pointer rounded-xl`}>
        <div className={`inline-block transition-all ${isClickedUser ? 'animate-slideInFromRight' : 'animate-slideOutToRight bg-opacity-0'}`}>
          <span className='text-gray-500 text-md font-bold inline-block ml-2'>ФИО Пользователя: {username}</span>
          <span className='text-gray-500 text-md font-bold inline-block ml-2'>Роль: {role}</span>
        </div>
        <div className={`text-gray-500 inline-block animate-fadeIn`}>
          <FaUser className="text-2xl inline-block"/>
          <span className='text-md font-bold inline-block ml-2'>Профиль</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
