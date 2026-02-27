import { memo } from 'react';
import { motion, type Variants, type Easing } from 'motion/react';
import './MainTitle.scss';

const EASE_SMOOTH: Easing = [0.25, 0.1, 0.25, 1];

function MainTitle() {
  const charVariants: Variants = {
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.06, duration: 0.6, ease: EASE_SMOOTH },
    }),
  };

  const renderChars = (text: string, direction: 'left' | 'right') => {
    const chars = text.split('');
    return chars.map((char, i) => {
      const delayIndex = direction === 'left' ? i : chars.length - 1 - i;
      return (
        <motion.span
          key={i}
          custom={delayIndex}
          variants={charVariants}
          initial={{ opacity: 0, x: direction === 'left' ? 30 : -30 }}
          animate="visible"
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <div className="main-title" aria-hidden="true">
      <div className="combined-wrapper">
        <div className="combined">
          <div className="title">{renderChars('David\u00a0T.', 'left')}</div>
          <div className="title-2">{renderChars('Pizarro\u00a0Frick', 'right')}</div>
          <motion.div
            className="combined-bar"
            initial={{ width: 0, x: 50 }}
            animate={{ width: '100%', x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE_SMOOTH }}
          />
          <motion.div
            className="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: EASE_SMOOTH }}
          >
            {'Desarrollador Full Stack'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.025, duration: 0.3, ease: EASE_SMOOTH }}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default memo(MainTitle);
