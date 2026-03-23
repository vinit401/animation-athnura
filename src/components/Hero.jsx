import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const counters = [
  { label: 'Products',        target: 50,  suffix: '+' },
  { label: 'Years Open',      target: 10,  suffix: '+' },
  { label: 'Happy Customers', target: 500, suffix: '+' },
  { label: 'Varieties',       target: 30,  suffix: '+' },
];

export default function Hero() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const counts = [
    useCounter(counters[0].target, 1800, started),
    useCounter(counters[1].target, 2000, started),
    useCounter(counters[2].target, 2200, started),
    useCounter(counters[3].target, 1600, started),
  ];

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.waveBg}>
        <div className={`${styles.wave} ${styles.wave1}`} />
        <div className={`${styles.wave} ${styles.wave2}`} />
        <div className={`${styles.wave} ${styles.wave3}`} />
      </div>
      <div className={`${styles.gradOrb} ${styles.gradOrb1}`} />
      <div className={`${styles.gradOrb} ${styles.gradOrb2}`} />
      <div className={`${styles.gradOrb} ${styles.gradOrb3}`} />

      {/* Back arrow — top left */}
      <div className={styles.backBtn}>←</div>

      {/* Center content */}
      <div className={styles.icon}>🛒</div>
      <div className={styles.welcomeText}>Welcome to</div>
      <h1 className={styles.title}>
        <span className={styles.titleGradient}>All-in-One General Store</span>
      </h1>
      <div className={styles.location}>📍 Sawad Bhandar</div>

      <div className={styles.counters}>
        {counters.map((c, i) => (
          <div key={c.label} className={styles.counterItem}>
            <div className={styles.counterNum}>{counts[i]}{c.suffix}</div>
            <div className={styles.counterLabel}>{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}