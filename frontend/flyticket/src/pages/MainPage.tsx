// MainPage.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FlightCard from '../components/FlightCard';
import flightsData from '../data/flights.json';

interface Flight {
  id: number;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  flightNumber: string;
  seats: {
    economy: number;
    business: number;
    firstClass: number;
  };
}

const MainPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight []>([]);

  useEffect(() => {
    setFlights(flightsData); // данные якобы берутся из сервера
  }, []);
  console.log(flights);

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.flightsContainer}>
        {flights.map((FlightDetailsPage) => (
          <FlightCard key={FlightDetailsPage.id} {...FlightDetailsPage} />
        ))}
      </div>
    </div>
  );
};


/*const flights = [
  { id: 1, departure: 'Нурсултан Назарбаев', arrival: 'Корея', date: '2023-11-10', time: '10:00', flightNumber: 'A1 234' },
  { id: 2, departure: 'Нурсултан Назарбаев', arrival: 'Казань', date: '2023-11-12', time: '13:30', flightNumber: 'A1 543' },
  { id: 3, departure: 'Нурсултан Назарбаев', arrival: 'Сочи', date: '2023-11-15', time: '17:00', flightNumber: 'A1 838' },
  { id: 4, departure: 'Алматы', arrival: 'Москва', date: '2023-11-20', time: '08:45', flightNumber: 'A1 148' },
  { id: 5, departure: 'Актау', arrival: 'Екатеринбург', date: '2023-11-22', time: '15:30', flightNumber: 'A1 455' },
  { id: 6, departure: 'Шымкент', arrival: 'Сочи', date: '2023-11-25', time: '18:20', flightNumber: 'A1 980' },
  { id: 7, departure: 'Нурсултан Назарбаев', arrival: 'Новосибирск', date: '2023-11-30', time: '09:15', flightNumber: 'A1 148' },
  { id: 8, departure: 'Актобе', arrival: 'Казань', date: '2023-12-02', time: '12:00', flightNumber: 'A1 732' },
  { id: 9, departure: 'Алматы', arrival: 'Санкт-Петербург', date: '2023-12-05', time: '16:45', flightNumber: 'A1 590' },
  { id: 10, departure: 'Шымкент', arrival: 'Москва', date: '2023-12-07', time: '20:30', flightNumber: 'A1 167' },
];

const MainPage: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.flightsContainer}>
        {flights.map((FlightDetailsPage) => (
          <FlightCard key={FlightDetailsPage.id} {...FlightDetailsPage} />
        ))}
      </div>
    </div>
  );
};*/

const styles = {
  pageContainer: {
    backgroundColor: '#e0f7fa',
  },
  flightsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    padding: '2rem',
  },
};

export default MainPage;
