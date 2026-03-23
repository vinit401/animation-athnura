import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  const { ref, visible } = useScrollReveal();

  return (
    <div ref={ref} className={`${styles.banner} ${visible ? styles.visible : ''}`}>
      <div className={styles.tag}>🎁 Exciting Offer Only on Monday</div>
      <div className={styles.title}>Get discount upto 10%</div>
      <button className={styles.btn}>🛍️ Shop Now</button>
    </div>
  );
}