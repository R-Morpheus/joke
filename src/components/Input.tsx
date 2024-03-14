import React from 'react';
import cls from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input className={cls.input} {...props} />
  );
};

export default Input;
