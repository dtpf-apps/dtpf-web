import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GetCoursesInfo from 'dbIndexed/courses/GetCoursesInfo';
import useConnection from 'hooks/useConnection';
import { COURSES_TECH, COURSES_HOURS } from 'utils/constants';
import { StorageValid } from 'utils/validations';
import './InfoBanner.scss';
import Spin from 'views/components/UI/Spin';

function InfoBanner() {
  const [totalDuration, setTotalDuration] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const courses = GetCoursesInfo(10000);
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const intervalRef = useRef(null);

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
      const durationArr = [];
      let totalDur = 0;
      if (courses && courses.docs) {
        courses.docs.forEach((course) => {
          isMounted && durationArr.push(course.duration);
        });
        durationArr.forEach((num) => {
          totalDur += num;
          isMounted && setTotalDuration(totalDur);
        });
        StorageValid() && totalDur > 0 && localStorage.setItem(COURSES_HOURS, totalDur);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [courses]);

  useEffect(() => {
    if (totalDuration > 0) {
      intervalRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev === 0 ? 1 : 0));
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalDuration]);

  const techLS = StorageValid() && localStorage.getItem(COURSES_TECH);
  const tech = techLS ? techLS : tecnologiesUsed(courses);

  return (
    <>
      {totalDuration === 0 ? (
        <Spin paddingTop="80px" height="200px" />
      ) : (
        <div className="info-banner">
          <AnimatePresence mode="wait">
            {activeSlide === 0 ? (
              <motion.div
                key="slide-0"
                className="info-banner-elem"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
              >
                <div className="info-banner-title">
                  <AnimationCountHours totalDuration={totalDuration} duration={duration} />
                </div>
                <motion.div
                  className="info-banner-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Horas de estudio presenciales y online
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="slide-1"
                className="info-banner-elem"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
              >
                <div className="info-banner-title">
                  {connectionStatus === 500 || !isNavigatorOnline ? courses.technologies : tech}
                </div>
                <motion.div
                  className="info-banner-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Tecnologías utilizadas
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

function AnimationCountHours({ totalDuration, duration }) {
  const [displayValue, setDisplayValue] = useState(duration ? Math.round(duration) : 0);
  const target = Number(totalDuration);

  useEffect(() => {
    if (!target || target === 0) return;
    const animDuration = 2000;
    const startTime = performance.now();
    const startValue = displayValue;
    let rafId;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animDuration, 1);
      const current = Math.round(startValue + (target - startValue) * progress);
      setDisplayValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return <span>{displayValue}</span>;
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

export default memo(InfoBanner);
