import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencil } from 'react-icons/hi2';
import { HiSparkles, HiArrowRight } from 'react-icons/hi2';
import { HiOutlineClock } from 'react-icons/hi2';
import styles from './PromptCard.module.css';

const MAX_LENGTH = 1000;

export default function PromptCard({ prompt, onPromptChange, onGenerate, isLoading }) {
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.max(el.scrollHeight, 160)}px`;
  }, [prompt]);

  const handleChange = (e) => {
    if (e.target.value.length <= MAX_LENGTH) {
      onPromptChange(e.target.value);
    }
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className={styles.header}>
        <div className={styles.iconWrap}>
          <HiOutlinePencil className={styles.icon} />
        </div>
        <div>
          <h2 className={styles.title}>1. What happened today?</h2>
          <p className={styles.subtitle}>Share any random event, thought, or activity.</p>
        </div>
      </div>

      <div className={styles.textareaWrap}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="e.g. I ate an apple today..."
          value={prompt}
          onChange={handleChange}
          disabled={isLoading}
          rows={6}
        />
        <span className={styles.counter}>
          {prompt.length} / {MAX_LENGTH}
        </span>
      </div>

      <motion.button
        type="button"
        className={styles.generateBtn}
        onClick={onGenerate}
        disabled={!prompt.trim() || isLoading}
        whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <HiSparkles className={styles.btnIcon} />
        <span>Generate Caption</span>
        <HiArrowRight className={styles.btnIcon} />
      </motion.button>

      <motion.button
        type="button"
        className={styles.historyBtn}
        onClick={() => navigate('/history')}
        whileHover={{ scale: 1.01, backgroundColor: '#f8fafc' }}
        whileTap={{ scale: 0.98 }}
      >
        <HiOutlineClock className={styles.historyIcon} />
        View History
      </motion.button>
    </motion.div>
  );
}
