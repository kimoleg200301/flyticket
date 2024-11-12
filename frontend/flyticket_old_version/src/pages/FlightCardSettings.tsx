// FlightCardSettings.tsx
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from '../modal/SettingsModal';

interface FlightProps {
  id: number;
  departure: string;
  arrival: string;
  date: string;
  time: string;
}

const FlightCardSettings: React.FC<FlightProps> = ({ id, departure, arrival, date, time }) => {
  return (
    // Тут не ссылка, а отображение модального окна
    <>
    <div className='transform transition duration-300 hover:scale-105 h-200 w-350 sm:w-700 m-4 p-6 bg-white shadow-xl rounded-16 cursor-pointer'>
      <h1 className='font-bold text-2xl m-0 p-0'>
        {departure} - {arrival}
      </h1>
      <div className='text-lg mt-8 p-0'>
        <p>Дата: {date}</p>
        <p>Время посадки: {time}</p>
      </div>
    </div>
    </>
  );
};

export default FlightCardSettings;
