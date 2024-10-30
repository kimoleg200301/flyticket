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
    <div style={styles.cardContainer}>
      <Link to={`/FlightDetailsPage/${id}`} style={styles.mainInfo}>
        {departure} - {arrival}
      </Link>
      <div style={styles.otherInfo}>
        <p>Дата: {date}</p>
        <p>Время посадки: {time}</p>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  mainInfo: {
    color: '#00796b',
    fontWeight: 'bold' as 'bold',
    textDecoration: 'none',
    fontSize: '1.2rem',
    display: 'block',
    marginBottom: '0.5rem',
  },
  otherInfo: {
    color: '#333',
  },
};

export default FlightCard;
