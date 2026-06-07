import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import styles from './LoadingOverlay.module.css';

const MESSAGES = [
  'Working Hard...',
  'Give Vipul an Internship to unlock his whole potential.',
  'Transforming ordinary moments into LinkedIn wisdom...',
  'Adding unnecessary professional insights...',
];

const MESSAGE_INTERVAL = 2500;
const TOTAL_DURATION = 8000;

export default function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL);

    const start = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / TOTAL_DURATION) * 100, 100));
    }, 50);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.card}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.div
          className={styles.logoWrap}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className={styles.logo}>
            <span>in</span>
          </div>
          <motion.div
            className={styles.sparkleRing}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <HiSparkles className={styles.sparkleIcon} />
          </motion.div>
        </motion.div>

        <div className={styles.messageWrap}>
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className={styles.message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
