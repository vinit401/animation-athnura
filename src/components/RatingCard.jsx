import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './RatingCard.module.css';

export default function RatingCard({ onSubmit }) {
  const { ref, visible } = useScrollReveal();
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [popping, setPopping] = useState(-1);

  const handleStar = (n) => {
    setSelected(n);
    setPopping(n);
    setTimeout(() => setPopping(-1), 400);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (!selected) { alert('Please select a star rating!'); return; }
    onSubmit(selected);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelected(0);
      setPhone('');
    }, 3000);
  };

  const display = hovered || selected;

  return (
    <div
      ref={ref}
      className={`${styles.scene} ${visible ? styles.visible : ''}`}
    >
      {/* RGB spinning border */}
      <div className={styles.rgbRing} />

      {/* Floating orbs inside */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <div className={`${styles.flipper} ${submitted ? styles.flipped : ''}`}>

        {/* FRONT — only title + icon */}
        <div className={styles.front}>
          <div className={styles.topAccent} />
          <div className={styles.frontIcon}>⭐</div>
          <div className={styles.frontTitle}>Rate Your Experience</div>
          <div className={styles.hint}>Hover to rate ✦</div>
        </div>

        {/* BACK — full form */}
        <div className={styles.back}>
          <div className={styles.topAccent} />
          <div className={styles.backTitle}>Rate Your Experience</div>
          <div className={styles.sub}>Your feedback helps us improve!</div>

          <div className={styles.stars}>
            {[1,2,3,4,5].map((n) => (
              <span
                key={n}
                className={`${styles.star} ${n <= display ? styles.active : ''} ${popping === n ? styles.pop : ''}`}
                onClick={() => handleStar(n)}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
              >
                {n <= display ? '★' : '☆'}
              </span>
            ))}
          </div>

          <input
            className={styles.input}
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className={styles.btn} onClick={handleSubmit}>
            <span className={styles.btnSweep} />
            ⚡ Submit Rating
          </button>
        </div>

        {/* THANK YOU — shown after submit */}
        {submitted && (
          <div className={`${styles.back} ${styles.thankFace}`}>
            <div className={styles.thankIcon}>🎉</div>
            <div className={styles.thankTitle}>Thank You!</div>
            <div className={styles.thankSub}>{selected} star{selected !== 1 ? 's' : ''} received!</div>
          </div>
        )}

      </div>
    </div>
  );
}