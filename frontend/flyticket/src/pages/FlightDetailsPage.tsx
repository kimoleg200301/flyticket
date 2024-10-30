// FlightDetailsPage.tsx
import React from 'react';

interface FlightDetailsProps {
  departure: string;
  arrival: string;
  username: string;
  date: string;
  flightNumber: string;
  seats: {
    economy: number;
    business: number;
    firstClass: number;
  };
}

const FlightDetailsPage: React.FC<FlightDetailsProps> = ({
  departure,
  arrival,
  username,
  date,
  flightNumber,
  seats,
}) => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.detailsContainer}>
        <h2 style={styles.route}>{departure} - {arrival}</h2>
        <p>Имя пользователя: {username}</p>
        <p>Дата рейса: {date}</p>
        <p>Номер рейса: {flightNumber}</p>
        <div style={styles.seats}>
          <p>Места (Эконом): {seats.economy}</p>
          <p>Места (Бизнес): {seats.business}</p>
          <p>Места (Первый класс): {seats.firstClass}</p>
        </div>
        <button style={styles.button}>Забронировать рейс</button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'flex-start' as 'flex-start',
    padding: '2rem',
    backgroundColor: '#e0f7fa',
    minHeight: '100vh',
  },
  detailsContainer: {
    maxWidth: '400px',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  route: {
    color: '#00796b',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  seats: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    backgroundColor: '#00796b',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold',
  },
};

export default FlightDetailsPage;
