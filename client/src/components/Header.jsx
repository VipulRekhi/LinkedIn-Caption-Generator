import { motion } from 'framer-motion';
import styles from './Header.module.css';

function LinkedInLogo() {
  return (
    <div className={styles.logo}>
      <span className={styles.logoText}>in</span>
    </div>
  );
}

function HeaderDoodle() {
  return (
    <svg className={styles.doodle} viewBox="0 0 120 80" fill="none" aria-hidden="true">
      <rect x="20" y="15" width="50" height="60" rx="6" stroke="#94A3B8" strokeWidth="2" fill="white" />
      <line x1="30" y1="30" x2="60" y2="30" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="30" y1="42" x2="55" y2="42" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="30" y1="54" x2="50" y2="54" stroke="#CBD5E1" strokeWidth="2" />
      <circle cx="75" cy="25" r="8" fill="#0A66C2" opacity="0.8" />
      <path d="M85 10 L90 5 M95 15 L100 10 M88 20 L93 15" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 50 Q5 45 10 40" stroke="#64748B" strokeWidth="1.5" fill="none" />
      <path d="M100 55 L105 50 L110 55" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Header({ compact = false }) {
  return (
    <motion.header
      className={`${styles.header} ${compact ? styles.compact : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.brand}>
        <LinkedInLogo />
        <div className={styles.brandText}>
          <h1 className={styles.title}>
            <span className={styles.titleDark}>LinkedIn</span>{' '}
            <span className={styles.titleBlue}>Caption Generator</span>
          </h1>
          {!compact && (
            <p className={styles.subtitle}>
              Turn boring moments into bold{' '}
              <span className="squiggle squiggle-blue">professional</span> insights.
            </p>
          )}
        </div>
      </div>
      {!compact && <HeaderDoodle />}
    </motion.header>
  );
}
