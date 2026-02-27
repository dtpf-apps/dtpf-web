import { memo } from 'react';
import { motion, type Variants, type Easing } from 'motion/react';
import './MainTitle.scss';

const EASE_LINEAR: Easing = 'linear';

function MainTitle() {
  const charVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.03, duration: 0.05, ease: EASE_LINEAR },
    }),
  };

  const renderChars = (text: string, direction: 'left' | 'right') => {
    const chars = text.replace(/\u00a0/g, '\u00a0').split('');
    const ordered = direction === 'left' ? chars : [...chars].reverse();
    return ordered.map((char, i) => {
      const index = direction === 'left' ? i : chars.length - 1 - i;
      return (
        <motion.span
          key={index}
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {chars[direction === 'left' ? i : chars.length - 1 - i]}
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
            transition={{ delay: 0.2, duration: 0.4, ease: EASE_LINEAR }}
          />
          <motion.div
            className="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {'Desarrollador Full Stack'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.005, duration: 0.05 }}
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
