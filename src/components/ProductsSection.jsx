import React from 'react';
import { products } from '../data/storeData';
import ProductCard from './ProductCard';
import styles from './ProductsSection.module.css';

export default function ProductsSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Welcome To My Store</h2>
      <p className={styles.sub}>Explore our wide range of products</p>
      <div className={styles.list}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            delay={`${i * 0.15}s`}
          />
        ))}
      </div>
    </section>
  );
}