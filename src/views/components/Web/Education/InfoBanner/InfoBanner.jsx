import React, { useState, useEffect } from 'react';
import GetCoursesInfo from 'dbIndexed/courses/GetCoursesInfo';
import useConnection from 'hooks/useConnection';
import { COURSES_TECH, COURSES_HOURS } from 'utils/constants';
import { StorageValid } from 'utils/validations';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin.js';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import './InfoBanner.scss';
import Spin from 'views/components/UI/Spin';

export default function InfoBanner() {
  TweenOne.plugins.push(Children);
  const [totalDuration, setTotalDuration] = useState(0);
  const [duration, setDuration] = useState(0);
  const courses = GetCoursesInfo(10000);
  const { connectionStatus, isNavigatorOnline } = useConnection();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDuration(totalDuration);
    }, 1);
    return () => {
      clearTimeout(timeout);
    };
  }, [totalDuration]);
  useEffect(() => {
    let isMounted = true;
    const coursesHours = StorageValid() && localStorage.getItem(COURSES_HOURS);
    if (coursesHours) {
      isMounted && setTotalDuration(coursesHours);
    } else {
      const duration = [];
      let totalDuration = 0;
      if (courses && courses.docs) {
        courses.docs.forEach((course) => {
          isMounted && duration.push(course.duration);
        });
        duration.forEach((num) => {
          totalDuration += num;
          isMounted && setTotalDuration(totalDuration);
        });
        StorageValid() && totalDuration > 0 && localStorage.setItem(COURSES_HOURS, totalDuration);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [courses]);
  const techLS = StorageValid() && localStorage.getItem(COURSES_TECH);
  const tech = techLS ? techLS : tecnologiesUsed(courses);
  return (
    <>
      {totalDuration === 0 ? (
        <Spin paddingTop="80px" height="200px" />
      ) : (
        <>
          <BannerAnim
            prefixCls="info-banner"
            arrow={false}
            thumb={false}
            autoPlay
            autoPlaySpeed={3000}
            dragPlay={false}
            type={['vertical', 'across']}
          >
            <Element prefixCls="info-banner-elem" key="0">
              <TweenOne className="info-banner-title" animation={{ y: 300, opacity: 0, type: 'from' }}>
                <AnimationCountHours totalDuration={totalDuration} duration={duration} />
              </TweenOne>
              <TweenOne
                className="info-banner-text"
                animation={{ y: 300, opacity: 0, type: 'from', delay: 100 }}
              >
                Horas de estudio presenciales y online
              </TweenOne>
            </Element>
            <Element prefixCls="info-banner-elem" key="1">
              <TweenOne className="info-banner-title" animation={{ y: 300, opacity: 0, type: 'from' }}>
                {connectionStatus === 500 || !isNavigatorOnline ? courses.technologies : tech}
              </TweenOne>
              <TweenOne
                className="info-banner-text"
                animation={{ y: 300, opacity: 0, type: 'from', delay: 100 }}
              >
                Tecnologías utilizadas
              </TweenOne>
            </Element>
          </BannerAnim>
        </>
      )}
    </>
  );
}

function AnimationCountHours({ totalDuration, duration }) {
  const [state, setState] = useState(null);
  useEffect(() => {
    let isMounted = true;
    isMounted &&
      setState({
        animation: {
          Children: {
            value: totalDuration,
            floatLength: 0,
          },
          duration: 2000,
        },
      });
    return () => {
      isMounted = false;
    };
  }, [totalDuration]);
  return <TweenOne animation={state && state.animation}>{duration && Math.round(duration)}</TweenOne>;
}

function tecnologiesUsed(courses) {
  const arrayTags = [];
  const tec = [];
  courses.docs &&
    courses.docs.forEach((course) => {
      arrayTags.push(course.tags);
    });
  for (let i = 0; i < arrayTags.length; i++) {
    const tecnologies = arrayTags[i];
    for (let j = 0; j < tecnologies.length; j++) {
      const tecnology = tecnologies[j];
      if (!tec.includes(tecnology)) {
        tec.push(tecnology);
      }
    }
  }
  StorageValid() && tec.length > 0 && localStorage.setItem(COURSES_TECH, tec.length);
  return tec.length;
}
