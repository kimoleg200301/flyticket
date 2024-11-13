// Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdGridOn } from 'react-icons/md';
import { FaGlobe } from 'react-icons/fa';

interface Token {
  username: string;
  role: string;
}

const Header: React.FC<Token> = ({username, role}) => {
  const [isClickedUser, setIsClickedUser] = useState<boolean>(false);
  const entryNavigate = useNavigate();
  const regNavigate = useNavigate();

  const clickEntry = () => {
    entryNavigate('/login');
  }
  const clickReg = () => {
    regNavigate('/register');
  }
  
  const userClick = () => {
    if (isClickedUser) {
      setIsClickedUser(false);
    }
    else {
      setIsClickedUser(true);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-[60px] flex items-center justify-between bg-[#f1f5f6] pl-[100px] pr-[100px] mx-auto z-40 select-none">
      {/* logo */}
      <div className='animate-fadeIn font-bold bg-black bg-opacity-0 hover:bg-opacity-5 transition-colors duration-150 cursor-pointer'>
        <a href='/'><MdGridOn className="text-5xl inline-block text-gray-500 text-xl" /></a>
      </div>
      {/* center */}
      <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center justify-between space-x-12'>
        <button className='text-gray-500 font-bold'>Поддержка</button>
        <button className='text-gray-500 font-bold flex items-center'>
          <FaGlobe className='mr-[5px] text-xl text-gray-500' />
          Язык
        </button>
      </div>
      {/* user */}
      <div className='space-x-12'>
        <button onClick={clickEntry} className='text-gray-500 font-bold'>Вход</button>
        <button onClick={clickReg} className='text-gray-500 font-bold'>Регистрация</button>
      </div>
    </div>
  );
};

export default Header;
