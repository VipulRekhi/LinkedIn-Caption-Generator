import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import styles from './Toast.module.css';

export default function Toast() {
  const { toast } = useToast();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
