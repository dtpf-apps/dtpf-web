import React, { useState, useEffect } from 'react';
import useRandomNumber from 'hooks/useRandomNumber';
import useEventListener from 'hooks/useEventListener';
import './WellcomeParagraph.scss';

export default function WellcomeParagraph() {
  const arrayWords = ['portfolio', 'web', '🌍'];
  const randomNumber = useRandomNumber(0, arrayWords.length - 1);
  const [randomNum, setRandomNum] = useState(randomNumber);

  useEffect(() => {
    let isMounted = true;
    const el = document.getElementsByClassName('wellcome-paragraph__text-dinamic-word');
    window.setTimeout(() => {
      isMounted && el[0].classList.remove('add-fade');
    }, 250);
    return () => {
      isMounted = false;
    };
  }, [randomNum]);

  useEffect(() => {
    let interval = setInterval(() => {
      handler();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomNum]);

  const handler = () => {
    const el = document.getElementsByClassName('wellcome-paragraph__text-dinamic-word');
    el[0].classList.add('add-fade');
    arrayWords.length - 1 === randomNum ? setRandomNum(0) : setRandomNum(randomNum + 1);
  };

  useEventListener('touchstart', handler, true);
  useEventListener('click', handler, false);

  return (
    <div className="wellcome-paragraph">
      <p className="wellcome-paragraph__text">
        <span aria-hidden="true">
          <span className="wellcome-paragraph__text-firstword">Hola</span>, `¡Bienvenido a mi ${'{'}
          <span className="wellcome-paragraph__text-dinamic-word">{`${arrayWords[randomNum]}`}</span>
          {'}'}!`
        </span>{' '}
        Me dedico a crear y mantener páginas y aplicaciones web. Aquí puedes encontrar mi formación y
        experiencia así como los proyectos en los que he trabajado.
      </p>
    </div>
  );
}
