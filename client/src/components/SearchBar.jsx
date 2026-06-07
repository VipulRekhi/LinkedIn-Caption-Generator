import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <HiOutlineMagnifyingGlass className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder="Search prompts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
