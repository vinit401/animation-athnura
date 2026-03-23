import React, { useRef } from 'react';
import { infoCards } from '../data/storeData';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './InfoCards.module.css';

function InfoCard({ card, delay, index }) {
  const { ref, visible } = useScrollReveal();
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;
    el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    el.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    el.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div
      ref={ref}
      className={`${styles.outerWrap} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: delay }}
    >
      <div
        ref={cardRef}
        className={`${styles.card} ${styles[`card${index}`]}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.spotlight} />
        <div className={`${styles.topBar} ${styles[`bar${index}`]}`} />

        <div className={`${styles.iconWrap} ${styles[`iconWrap${index}`]}`}>
          <span className={styles.iconEmoji}>{card.icon}</span>
        </div>

        <div className={styles.title}>{card.title}</div>
        <div className={`${styles.divider} ${styles[`divider${index}`]}`} />

        <div className={styles.lines}>
          {card.lines.map((line, i) => (
            <div key={i} className={`${styles.line} ${styles[`line${index}`]}`}>
              <span className={`${styles.dot} ${styles[`dot${index}`]}`} />
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InfoCards() {
  return (
    <div className={styles.section}>
      <div className={styles.list}>
        {infoCards.map((card, i) => (
          <InfoCard key={card.id} card={card} delay={`${i * 0.13}s`} index={i} />
        ))}
      </div>
    </div>
  );
}