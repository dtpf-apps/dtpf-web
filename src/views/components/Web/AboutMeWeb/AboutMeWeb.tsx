import React, { useState, useEffect } from "react";
import { getAboutMeInfoApi } from "api/aboutMe";
import useScrollToTop from "hooks/useScrollToTop";
import { Image } from "antd";
import "./AboutMeWeb.scss";
import Clock from "./Clock";
import Cube from "./Cube";
import image from "assets/img/png/yo.png";

export default function AboutMeWeb() {
  useScrollToTop();
  const [mainInfo, setMainInfo] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAboutMeInfoApi("mainInfo").then((response) => {
      isMounted && setMainInfo(response.info)
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="about-me">
      <div className="about-me__title">
        <h1>Sobre Mi</h1>
      </div>
      <Row1 mainInfo={mainInfo} />
      <Row2 />
    </div>
  );
}

function Row1(props: any) {
  const { mainInfo } = props;
  return (
    <div className="about-me__row1">
      <div className="about-me__row1-content">
        <div className="about-me__row1-content-image">
          <Image src={image} preview={false}></Image>
        </div>
        <div className="about-me__row1-content-text1">{mainInfo.content1}</div>
      </div>
    </div>
  );
}

function Row2() {
  const [skillsBounce, setSkillsBounce] = useState(true);
  const [clockBorderBottom, setClockBorderBottom] = useState(false);
  const [hobbiesRotate, setHobbiesRotate] = useState(false);
  const skillsB = () => {
    setSkillsBounce(true);
    setClockBorderBottom(false);
    setHobbiesRotate(false);
  };
  const hobbiesR = () => {
    setHobbiesRotate(true);
    setSkillsBounce(false);
    setClockBorderBottom(false);
  };
  const clockBB = () => {
    setClockBorderBottom(true);
    setSkillsBounce(false);
    setHobbiesRotate(false);
  };
  return (
    <>
      <div className="about-me__row2">
        <div
          className={
            skillsBounce ? "about-me__row2-emoticon-1 addBorderBottom" : "about-me__row2-emoticon-1"
          }
          onClick={skillsB}
        >
          <span role="img" aria-label="Emoji skills">
            🧰
          </span>
        </div>
        <div
          className={
            clockBorderBottom ? "about-me__row2-clock addBorderBottom" : "about-me__row2-clock"
          }
          onClick={clockBB}
        >
          <Clock />
        </div>
        <div
          className={
            hobbiesRotate
              ? "about-me__row2-emoticon-2 addBorderBottom"
              : "about-me__row2-emoticon-2"
          }
          onClick={hobbiesR}
        >
          <span role="img" aria-label="Emoji hobbies">
            🏹
          </span>
        </div>
      </div>
      <div className="about-me__content">
        {clockBorderBottom && (
          <div className="about-me__content-my-history">
            <h2>Mi historia</h2>
            <MyHistory />
          </div>
        )}
        {hobbiesRotate && (
          <div className="about-me__content-hobbies">
            <h2>Aficiones</h2>
            <Hobbies />
          </div>
        )}
        {skillsBounce && (
          <div className="about-me__content-skills">
            <h2>Competencias</h2>
            <Cube />
          </div>
        )}
      </div>
    </>
  );
}

function MyHistory() {
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    let unmounted = false;
    let timeOut = setTimeout(() => setIsTyping(false), 4500);
    if (!unmounted) {
      if (isTyping) {
        typeWriter1();
      }
      if (!isTyping) {
        typeWriter2();
      }
    }
    return () => {
      unmounted = true;
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);
  const txt1 = `Nacido en Mallorca, y gracias a mis padres fui criado
    con influencia sueca y española. Esto se refleja en cómo
    soy y cómo he ido creciendo a lo largo de los años.
    Una persona muy cercana, a la vez que un poco minimalista
    y sencillo.`;
  const txt2 = `Siempre me ha apasionado crear cosas para hacer la vida 
    más fácil, no obstante nunca tuve claro que “quería ser 
    de mayor”, tenía claro que a lo que me dedicaba no era 
    lo mío, pero a la vez no llegaba a encontrar en qué
    quería invertir mi tiempo; hasta que un día, dejé mi 
    trabajo estable como encargado de un supermercado, 
    para comenzar a estudiar programación, fue entonces 
    cuando tuve claro que eso era a lo que me quería dedicar.
    Hace poco mas de dos años de eso, y sin duda, ha sido 
    una de las mejores decisiones que he tomado. Estoy 
    empezando y tengo mucho recorrido por delante, eso 
    sí, ganas de aprender y de superarme no me faltan!`;
  const random = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  let i = 0;
  const typeWriter1 = () => {
    let text1 = document.getElementById("type-history-1");
    if (text1) {
      if (i < txt1.length) {
        text1.innerHTML += txt1.charAt(i);
        i++;
        setTimeout(typeWriter1, random(13, 15));
      }
    }
  };
  const typeWriter2 = () => {
    let text2 = document.getElementById("type-history-2");
    if (text2) {
      if (!isTyping) {
        if (i < txt2.length) {
          text2.innerHTML += txt2.charAt(i);
          i++;
          setTimeout(typeWriter2, random(13, 15));
        }
      }
    }
  };
  return (
    <>
      <p id="type-history-1"></p>
      <p id="type-history-2"></p>
    </>
  );
}

function Hobbies() {
  const [bold1, setBold1] = useState(false);
  const [bold2, setBold2] = useState(false);
  const [bold3, setBold3] = useState(false);
  const [bold4, setBold4] = useState(false);
  useEffect(() => {
    const timeOut1 = setTimeout(() => {
      setBold1(true);
    }, 1000);
    const timeOut2 = setTimeout(() => {
      setBold2(true);
    }, 2000);
    const timeOut3 = setTimeout(() => {
      setBold3(true);
    }, 3000);
    const timeOut4 = setTimeout(() => {
      setBold4(true);
    }, 4000);
    return () => {
      clearTimeout(timeOut1);
      clearTimeout(timeOut2);
      clearTimeout(timeOut3);
      clearTimeout(timeOut4);
    };
  }, []);
  return (
    <p>
      ¿Qué me gusta? Es una pregunta que me hago a menudo, tengo muy claro lo que no quiero y lo que
      no me gusta, pero seguir probando cosas nuevas es algo que me encanta.
      <br />
      Soy una persona muy activa y el
      <span className={bold1 ? "addBoldText" : undefined}> deporte </span>
      me ayuda a resolver problemas y a tener nuevas ideas, pero apesar de haber practicado tantos,
      pocos como la bici se convierten en rutina. El siguiente, será el tiro con arco.
      <br />
      Me encanta la
      <span className={bold2 ? "addBoldText" : undefined}> naturaleza</span>, lo relacionado con
      ella; poder ir al campo a dar un buen paseo y descubrir nuevas rutas andando o en bici.
      <br />
      Crear, reparar y mejorar lo que quiera con mis manos y la ayuda de mis herramientas ha sido mi
      principal afición hasta que conocí el mundo de la programación; desde pequeño las
      <span className={bold3 ? "addBoldText" : undefined}> manualidades </span>
      fueron lo mio.
      <br />
      Podría seguir destacando muchas más cosas que me gustan y con las que me identifico, pero sin
      duda, una de las que más me identifican es el amor que tengo a los
      <span className={bold4 ? "addBoldText" : undefined}> animales</span>. He tenido tantos y tan
      diferentes que no sabría por donde empezar, desde vertebrados de todos los grupos hasta
      invertebrados clasificados como plagas; sin duda me quedo con los actuales, dos perros (un
      crestado chino y una pitbull) y una gata común peculiar, con los que disfruto todo lo que
      puedo.
    </p>
  );
}
