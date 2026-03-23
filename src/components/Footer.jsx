import React from 'react';
import { contactInfo, timings } from '../data/storeData';
import styles from './Footer.module.css';

function FlipCard({ front, back, index }) {
  return (
    <div className={`${styles.scene} ${styles[`scene${index}`]}`}>
      <div className={styles.flipper}>

        {/* FRONT */}
        <div className={styles.front}>
          <div className={`${styles.topBar} ${styles[`bar${index}`]}`} />
          <div className={styles.frontContent}>
            <div className={styles.frontIcon}>{['🏪', '📞', '🕐'][index]}</div>
            <div className={styles.frontTitle}>{['About Our Store', 'Contact Us', 'Store Timings'][index]}</div>
            <div className={styles.hint}>Hover to see more ✦</div>
          </div>
        </div>

        {/* BACK */}
        <div className={styles.back}>
          <div className={`${styles.topBar} ${styles[`bar${index}`]}`} />
          {back}
        </div>

      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>

        {/* About */}
        <FlipCard index={0} back={
          <div className={styles.backContent}>
            <div className={styles.heading}>About Our Store</div>
            <p className={styles.text}>
              All-in-One General Store is your friendly neighborhood shop offering
              fresh fruits, vegetables, dairy, and daily essentials — all at
              unbeatable prices. Grab it and say "Aaye haaye sawad he aagya..."
            </p>
          </div>
        } />

        {/* Contact */}
        <FlipCard index={1} back={
          <div className={styles.backContent}>
            <div className={styles.heading}>Contact Us</div>
            <div className={styles.contactList}>
              {contactInfo.map((item) => (
                <div key={item.text} className={styles.contactItem}>
                  <div className={styles.contactIcon}>{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        } />

        {/* Timings */}
        <FlipCard index={2} back={
          <div className={styles.backContent}>
            <div className={styles.heading}>Store Timings</div>
            <div className={styles.timingList}>
              {timings.map((t) => (
                <div key={t.label} className={styles.timingItem}>
                  <div className={`${styles.dot} ${styles[t.dot]}`} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        } />

      </div>

      <div className={styles.copy}>
        © 2025 All-in-One General Store. All rights reserved.
      </div>
    </footer>
  );
}