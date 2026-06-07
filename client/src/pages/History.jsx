import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import HistoryTable from '../components/HistoryTable';
import { fetchHistory } from '../services/api';
import sampleHistory from '../data/sampleHistory';
import styles from './History.module.css';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await fetchHistory();
        setHistory(data.length > 0 ? data : sampleHistory);
      } catch {
        setHistory(sampleHistory);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const filtered = history.filter((item) =>
    item.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      <div className={styles.container}>
        <Header compact />

        <div className={styles.topBar}>
          <div className={styles.titleGroup}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => navigate('/')}
              aria-label="Back to home"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className={styles.title}>History</h1>
              <p className={styles.subtitle}>
                Review your past prompts and generated captions.
              </p>
            </div>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <HistoryTable items={filtered} loading={loading} />

        <Footer />
      </div>
    </motion.div>
  );
}
