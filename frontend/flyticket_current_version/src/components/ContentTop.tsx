import React, { useState, useEffect } from 'react';
// @ts-ignore
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaMinus } from 'react-icons/fa';

interface TabName {
  tab: string;
}

const ContentTop: React.FC<TabName> = ({ tab }) => {
  // useEffect(() => {
  //   AOS.init({
  //     offset: 100,
  //     duration: 500,
  //     easing: "ease-in-sine",
  //     delay: 100,
  //   });
  //   AOS.refresh();
  // }, []);
  return (
    <>
    <div className='h-[125px] w-full pl-[100px] pr-[100px] flex items-center justify-between'>
      <div className='flex flex-col items-center justify-between'>
        <span className='text-4xl font-bold'>Flyticket</span>
        <span className='text-sm'>Бронирование рейсов</span>
      </div>
        <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-[10px] inline-block text-gray-500 font-bold flex items-center justify-center space-x-12'>
          <div className='flex flex-col items-center justify-between'><Link to='/' className={`${tab !== 'TabMain' && 'transform transition-transform duration-500 ease-out hover:-translate-y-2'}`}>Главная</Link> {tab === 'TabMain' && <FaMinus className='text-black' />}</div>
          <div className='flex flex-col items-center justify-between'><Link to='/Direction' className={`${(tab !== 'TabDirection' && tab !== 'TabDirectionDetail') && 'transform transition-transform duration-500 ease-out hover:-translate-y-2'}`}>Направления</Link> {(tab === 'TabDirection' || tab === 'TabDirectionDetail') && <FaMinus className='text-black' />}</div>
          <div className='flex flex-col items-center justify-between'><Link to='/Settings' className={`${tab !== 'TabSettings' && 'transform transition-transform duration-500 ease-out hover:-translate-y-2'}`}>Настройки</Link> {tab === 'TabSettings' && <FaMinus className='text-black' />}</div>
        </div>
      <div className='text-gray-500 font-bold'>
        <button className='h-[60px] w-[165px] bg-[#3e5bb7] text-gray-50 rounded-[40px]'>Контакты</button>
      </div>
    </div>
    </>
  );
}

export default ContentTop;