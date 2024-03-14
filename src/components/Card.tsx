import React from 'react';
import cls from './Card.module.css';

interface CardProps {
  joke: {
    id: string;
    url: string;
    value: string;
    created_at: string;
  };
  className?: string;
}

const Card: React.FC<CardProps> = ({ joke, className }) => {
  console.log(joke)

  const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1), // Месяцы начинаются с 0
      date.getFullYear(),
    ].join('/') + ', ' + [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':');
  };

  return (
    <div className={`${cls.container} ${className ? cls[className] : ''}`}>
      <a href={joke.url} className={cls.link} target="_blank" rel="noopener noreferrer">
        {joke.value}
      </a>
      <div className={cls.description}>
        <span>{joke.id}</span>
        <span>{formatDate(joke.created_at)}</span>
      </div>
    </div>
  );
};

export default Card;
