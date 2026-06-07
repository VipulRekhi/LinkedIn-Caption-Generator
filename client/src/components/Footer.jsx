import { motion } from 'framer-motion';
import styles from './Footer.module.css';

function CoffeeDoodle() {
  return (
    <svg className={styles.icon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M8 12h14v10a4 4 0 01-4 4H12a4 4 0 01-4-4V12z" stroke="#64748B" strokeWidth="1.5" fill="white" />
      <path d="M22 14h2a3 3 0 010 6h-2" stroke="#64748B" strokeWidth="1.5" />
      <path d="M12 8 Q12 4 16 4 Q20 4 20 8" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
      <circle cx="14" cy="18" r="1" fill="#64748B" />
      <circle cx="18" cy="18" r="1" fill="#64748B" />
      <path d="M14 21 Q16 23 18 21" stroke="#64748B" strokeWidth="1" fill="none" />
    </svg>
  );
}

function HeartDoodle() {
  return (
    <svg className={styles.icon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 26 C16 26 6 18 6 12 C6 9 8 7 11 7 C13 7 15 8 16 10 C17 8 19 7 21 7 C24 7 26 9 26 12 C26 18 16 26 16 26Z"
        stroke="#22C55E"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <CoffeeDoodle />
      <p className={styles.text}>
        Built with excessive <span className="squiggle squiggle-yellow">optimism</span> by Vipul.
      </p>
      <HeartDoodle />
    </motion.footer>
  );
}
