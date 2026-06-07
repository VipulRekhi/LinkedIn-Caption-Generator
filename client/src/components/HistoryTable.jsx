import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import CaptionModal from './CaptionModal';
import { useToast } from '../context/ToastContext';
import styles from './HistoryTable.module.css';

const TRUNCATE_LENGTH = 180;

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function truncate(text, max = TRUNCATE_LENGTH) {
  if (text.length <= max) return text;
  return text.slice(0, max).trim() + '...';
}

export default function HistoryTable({ items, loading }) {
  const [modalItem, setModalItem] = useState(null);
  const { showToast } = useToast();

  const handleCopy = async (caption) => {
    try {
      await navigator.clipboard.writeText(caption);
      showToast('Caption copied successfully!');
    } catch {
      showToast('Failed to copy caption.');
    }
  };

  if (loading) {
    return (
      <div className={styles.card}>
        <p className={styles.loadingText}>Loading history...</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colIndex}>#</th>
                <th className={styles.colPrompt}>Given Prompt</th>
                <th className={styles.colCaption}>Generated Caption</th>
                <th className={styles.colDate}>Created At</th>
                <th className={styles.colAction} aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    No matching prompts found.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id ?? index}>
                    <td className={styles.colIndex}>{index + 1}</td>
                    <td className={styles.colPrompt}>{item.prompt}</td>
                    <td className={styles.colCaption}>
                      <span>{truncate(item.caption)}</span>
                      {item.caption.length > TRUNCATE_LENGTH && (
                        <button
                          type="button"
                          className={styles.readMore}
                          onClick={() => setModalItem(item)}
                        >
                          Read More
                        </button>
                      )}
                    </td>
                    <td className={styles.colDate}>{formatDate(item.created_at)}</td>
                    <td className={styles.colAction}>
                      <motion.button
                        type="button"
                        className={styles.copyBtn}
                        onClick={() => handleCopy(item.caption)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Copy caption"
                      >
                        <HiOutlineDocumentDuplicate />
                      </motion.button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalItem && (
          <CaptionModal
            item={modalItem}
            onClose={() => setModalItem(null)}
            onCopy={() => handleCopy(modalItem.caption)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
