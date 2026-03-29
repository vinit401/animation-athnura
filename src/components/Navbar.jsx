import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Products', id: 'products' },
  { label: 'About', id: 'about' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>

      {/* Center links */}
      <div className={styles.desktopLinks}>
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={`#${link.id}`}
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* LEFT toggle */}
      <div className={styles.rightGroup}>
        <button className={styles.themeBtn} onClick={toggleTheme}>
          {theme === 'dark' ? '🌙' : '🌞'}
        </button>
      </div>

    </nav>
  );
}