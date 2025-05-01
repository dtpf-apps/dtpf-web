import { useState, useEffect } from 'react';

export default function useRandomNumber(min: number, max: number) {
  const number = random(min, max);
  const [randomNumber, setRandomNumber] = useState(number);
  useEffect(() => {
    setRandomNumber(number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return randomNumber;
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
