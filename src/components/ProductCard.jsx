import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './ProductCard.module.css';

const iconClassMap = {
  fruit: styles.fruitIcon,
  veggie: styles.veggieIcon,
  other: styles.otherIcon,
};

const cardClassMap = {
  fruit: styles.fruit,
  veggie: styles.veggie,
  other: styles.other,
};

export default function ProductCard({ product, delay }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${cardClassMap[product.type]} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: delay }}
    >
      {/* RGB rotating border */}
      <div className={styles.rgbBorder} />

      <div className={styles.inner}>

        {/* FRONT */}
        <div className={styles.front}>
          <div className={`${styles.icon} ${iconClassMap[product.type]}`}>
            {product.icon}
          </div>
          <div className={styles.frontName}>{product.name}</div>
          <div className={styles.hint}>Hover to explore ✦</div>
        </div>

        {/* BACK */}
        <div className={styles.back}>
          <div className={styles.header}>
            <div className={`${styles.iconSmall} ${iconClassMap[product.type]}`}>
              {product.icon}
            </div>
            <div className={styles.name}>{product.name}</div>
          </div>
          <div className={styles.items}>
            {product.items.map((item) => (
              <span key={item} className={styles.tag}>{item}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}