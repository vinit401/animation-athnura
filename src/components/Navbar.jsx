import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home',     icon: '🏠', id: 'home' },
  { label: 'Products', icon: '📦', id: 'products' },
  { label: 'About',    icon: 'ℹ️',  id: 'about' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (!e.target.closest(`.${styles.drawer}`) &&
          !e.target.closest(`.${styles.rightGroup}`)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>

        <div className={styles.spacer} />

        {/* Center links */}
        <div className={styles.desktopLinks}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={`#${link.id}`}
              className={styles.link}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right group — theme + hamburger in one pill */}
        <div className={styles.rightGroup}>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : '🌞'}
          </button>
          <div className={styles.divider} />
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>

      </nav>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayShow : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* RIGHT DRAWER */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerLogo}>
            <div className={styles.drawerLogoIcon}>🛒</div>
            <div className={styles.drawerLogoText}>
              <span className={styles.drawerLogoMain}>AllInOne</span>
              <span className={styles.drawerLogoSub}>General Store</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <div className={styles.drawerDivider} />

        <nav className={styles.drawerNav}>
          {NAV_LINKS.map((link, i) => (
            <a key={link.label} href={`#${link.id}`}
              className={styles.drawerLink}
              style={{ animationDelay: menuOpen ? `${i * 0.07 + 0.1}s` : '0s' }}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
            >
              <span className={styles.drawerLinkIcon}>{link.icon}</span>
              {link.label}
              <span className={styles.drawerArrow}>→</span>
            </a>
          ))}
        </nav>

        <div className={styles.drawerDivider} />

        <div className={styles.drawerTheme}>
          <span className={styles.drawerThemeLabel}>
            {theme === 'dark' ? '🌙 Dark Mode' : '🌞 Light Mode'}
          </span>
          <button className={styles.drawerThemeBtn} onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        <div className={styles.drawerFooter}>© 2025 AllInOne Store</div>
      </div>
    </>
  );
}