import { motion } from 'framer-motion';
import { HiOutlineDocumentDuplicate, HiXMark } from 'react-icons/hi2';
import styles from './CaptionModal.module.css';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function CaptionModal({ item, onClose, onCopy }) {
  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <HiXMark />
        </button>

        <h2 className={styles.title}>Caption Details</h2>

        <div className={styles.section}>
          <h3 className={styles.label}>Given Prompt</h3>
          <p className={styles.promptText}>{item.prompt}</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.label}>Generated Caption</h3>
          <p className={styles.captionText}>{item.caption}</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.label}>Created At</h3>
          <p className={styles.dateText}>{formatDate(item.created_at)}</p>
        </div>

        <div className={styles.actions}>
          <motion.button
            type="button"
            className={styles.copyBtn}
            onClick={onCopy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <HiOutlineDocumentDuplicate />
            Copy Caption
          </motion.button>
          <button type="button" className={styles.dismissBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
