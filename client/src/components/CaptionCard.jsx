import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { useToast } from '../context/ToastContext';
import styles from './CaptionCard.module.css';

function EmptyIllustration() {
  return (
    <svg className={styles.emptyIcon} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <rect x="18" y="12" width="44" height="56" rx="4" stroke="#CBD5E1" strokeWidth="2" fill="white" />
      <line x1="26" y1="26" x2="54" y2="26" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="26" y1="36" x2="50" y2="36" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="26" y1="46" x2="46" y2="46" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M62 20 L66 16 M68 24 L72 20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkleDecor() {
  return (
    <div className={styles.sparkles} aria-hidden="true">
      <span>✦</span>
      <span>✦</span>
      <span>✦</span>
    </div>
  );
}

export default function CaptionCard({ caption, error, isLocked, isLoading }) {
  const { showToast } = useToast();
  const hasCaption = Boolean(caption && !error);

  const handleCopy = async () => {
    if (!hasCaption) return;
    try {
      await navigator.clipboard.writeText(caption);
      showToast('Caption copied successfully!');
    } catch {
      showToast('Failed to copy caption.');
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${isLocked ? styles.locked : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLocked ? 0.8 : 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={`${styles.iconWrap} ${styles.iconGreen}`}>
            <HiOutlineChatBubbleLeftRight className={styles.icon} />
          </div>
          <div>
            <h2 className={styles.title}>2. Your LinkedIn Caption</h2>
            <p className={styles.subtitle}>Your AI-generated caption will appear here.</p>
          </div>
        </div>
        <SparkleDecor />
      </div>

      <div className={`${styles.display} ${isLocked ? styles.displayLocked : ''}`}>
        <AnimatePresence mode="wait">
          {hasCaption ? (
            <motion.div
              key="caption"
              className={styles.captionContent}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className={styles.captionText}>{caption}</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className={styles.emptyState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className={styles.errorText}>{error}</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className={styles.emptyState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <EmptyIllustration />
              <h3 className={styles.emptyTitle}>
                Your caption will show up{' '}
                <span className="squiggle squiggle-green">here.</span>
              </h3>
              <p className={styles.emptyText}>Go ahead, drop a life event on the left.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.actions}>
        <motion.button
          type="button"
          className={`${styles.copyBtn} ${hasCaption ? styles.copyActive : ''}`}
          onClick={handleCopy}
          disabled={!hasCaption || isLoading}
          whileHover={hasCaption ? { scale: 1.03 } : {}}
          whileTap={hasCaption ? { scale: 0.97 } : {}}
        >
          <HiOutlineDocumentDuplicate className={styles.copyIcon} />
          Copy Caption
        </motion.button>
      </div>
    </motion.div>
  );
}
