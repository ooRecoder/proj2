import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/layout.module.css';

function Layout({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      {children}
    </div>
  );
}

export default Layout;
