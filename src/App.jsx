import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Particles from './components/Particles';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import InfoCards from './components/InfoCards';
import PromoBanner from './components/PromoBanner';
import RatingCard from './components/RatingCard';
import ProductsSection from './components/ProductsSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Navbar from './components/Navbar.jsx';

export default function App() {
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleRatingSubmit = (stars) => {
    setToast({ show: true, message: `⭐ ${stars} star rating submitted! Thank you!` });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <ThemeProvider>
      <Particles />
      <Navbar />
      <Toast message={toast.message} show={toast.show} />

      <div id="home">
        <Hero />
      </div>

      {/* <div id="about"> */}
        <InfoCards />
      {/* </div> */}

      <PromoBanner />
      <RatingCard onSubmit={handleRatingSubmit} />

      <div id="products">
        <ProductsSection />
        {/* <ProductsAPI /> */}
      </div>

      

      <div id="about">
        <Footer />
      </div>

    </ThemeProvider>
  );
}

// import React, { useState } from 'react';
// import { ThemeProvider } from './context/ThemeContext.jsx';
// import Particles from './components/Particles';
// import ThemeToggle from './components/ThemeToggle';
// import Hero from './components/Hero';
// import InfoCards from './components/InfoCards';
// import PromoBanner from './components/PromoBanner';
// import RatingCard from './components/RatingCard';
// import ProductsSection from './components/ProductsSection';
// import Footer from './components/Footer';
// import Toast from './components/Toast';
// import Navbar from './components/Navbar.jsx';