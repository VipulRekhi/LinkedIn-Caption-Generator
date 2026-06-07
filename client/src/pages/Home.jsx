import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PromptCard from '../components/PromptCard';
import CaptionCard from '../components/CaptionCard';
import LoadingOverlay from '../components/LoadingOverlay';
import { generateCaption } from '../services/api';
import { useState } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setHasGenerated(false);

    const minDelay = new Promise((resolve) => setTimeout(resolve, 8000));

    try {
      const [result] = await Promise.all([
        generateCaption(prompt.trim()).catch((err) => {
          const message =
            err.response?.data?.error ||
            err.response?.data ||
            err.message ||
            'Something went wrong. Please try again.';
          throw new Error(typeof message === 'string' ? message : 'Something went wrong.');
        }),
        minDelay,
      ]);

      setCaption(result);
      setHasGenerated(true);
    } catch (err) {
      setCaption('');
      setError(err.message);
      setHasGenerated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>

      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <PromptCard
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <CaptionCard
            caption={caption}
            error={error}
            isLocked={!hasGenerated}
            isLoading={isLoading}
          />
        </main>

        <Footer />
      </div>
    </motion.div>
  );
}
