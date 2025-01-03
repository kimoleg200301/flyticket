// FlightCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface FlightProps {
  id: number;
  departure: string;
  arrival: string;
  date: string;
  time: string;
}

const FlightCard: React.FC<FlightProps> = ({ id, departure, arrival, date, time }) => {
  return (
    <Link to={`/FlightDetailsPage/${id}`}>
      <div className='transform transition duration-300 hover:scale-105 h-200 w-350 sm:w-700 m-4 p-6 bg-white shadow-xl rounded-16'>
        <h1 className='font-bold text-2xl m-0 p-0'>
          {departure} - {arrival}
        </h1>
        <div className='text-lg mt-8 p-0'>
          <p>Дата: {date}</p>
          <p>Время посадки: {time}</p>
        </div>
      </div>
    </Link>
  );
};

export default FlightCard;
