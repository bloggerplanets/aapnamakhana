import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/products/featured').then(r => r.json()).then(setFeatured);
    fetch('/api/products/categories').then(r => r.json()).then(setCategories);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Premium <span className="highlight">Makhana</span><br />from the Heart of Bihar
            </h1>
            <p className="hero-description">
              Experience the authentic taste of handpicked fox nuts, sourced directly from Bihar's finest farms.
              From classic salted to exotic flavors — healthy snacking will never be the same.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-primary btn-lg">Shop Now →</Link>
              <Link to="/about" className="btn btn-secondary btn-lg">Our Story</Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">50K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-value">15+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat">
                <div className="stat-value">4.8</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-circle">
                <img src="https://www.aapnamakhana.com/assets/images/makhana.png" alt="Premium Makhana" className="hero-makhana-real" />
              </div>
              <div className="floating-card">
                <div className="card-icon">🌿</div>
                <div>
                  <div className="card-text">100% Natural</div>
                  <div className="card-subtext">No artificial flavors</div>
                </div>
              </div>
              <div className="floating-card">
                <div className="card-icon">⚡</div>
                <div>
                  <div className="card-text">Fast Delivery</div>
                  <div className="card-subtext">2-4 day shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Find your perfect makhana from our curated collections</p>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/shop?category=${cat.id}`} key={cat.id} className="category-card">
                <span className="category-icon">
                  {cat.id === 'plain' && '🥜'}
                  {cat.id === 'flavored' && '🌶️'}
                  {cat.id === 'organic' && '🌿'}
                  {cat.id === 'giftpack' && '🎁'}
                </span>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-count">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Bestsellers</h2>
          <p className="section-subtitle">Our most loved products, chosen by thousands</p>
          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/shop" className="btn btn-primary">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why AapnaMakhana?</h2>
          <p className="section-subtitle">Delivering purity, taste & trust from Bihar</p>
          <div className="categories-grid">
            <div className="category-card">
              <span className="category-icon">🏆</span>
              <h3 className="category-name">Premium Quality</h3>
              <p className="category-count">Carefully selected from Bihar's best farms</p>
            </div>
            <div className="category-card">
              <span className="category-icon">🔬</span>
              <h3 className="category-name">Lab Tested</h3>
              <p className="category-count">Quality-checked for purity & hygiene</p>
            </div>
            <div className="category-card">
              <span className="category-icon">🚚</span>
              <h3 className="category-name">Fresh Delivery</h3>
              <p className="category-count">Direct from our processing unit</p>
            </div>
            <div className="category-card">
              <span className="category-icon">📦</span>
              <h3 className="category-name">Custom Solutions</h3>
              <p className="category-count">Bulk supply & OEM available</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="about-grid">
            <div>
              <img src="https://www.aapnamakhana.com/assets/images/aapnamakhana.png" alt="Aapna Makhana" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} />
            </div>
            <div>
              <span style={{ display: 'inline-block', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>About Us</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>India's Trusted Makhana Brand from Bihar</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
                Welcome to <strong>Aapna Makhana</strong>, your trusted destination for premium-quality fox nuts sourced directly from the heart of Bihar.
                Known as the hub of the world's finest makhana, Bihar produces the highest-grade fox nuts.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px' }}>
                From sourcing to packaging, every step is carefully managed to ensure you receive fresh, crunchy, and nutritious makhana every time.
              </p>
              <Link to="/about" className="btn btn-primary">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Loved by customers across India for quality, freshness, and taste</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"AapnaMakhana has completely replaced my chips addiction! The peri peri makhana is my go-to evening snack. Love the quality and freshness."</p>
              <div className="testimonial-author">
                <div className="author-avatar">P</div>
                <div>
                  <div className="author-name">Priya Sharma</div>
                  <div className="author-location">Mumbai</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"Best quality makhana I've ever had. The 6 Sutta+ grade is incredible — huge, crunchy, and so fresh. The packaging is premium too."</p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div>
                  <div className="author-name">Rahul Gupta</div>
                  <div className="author-location">Delhi</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"My kids love the cream & onion makhana! Finally a healthy snack they actually ask for. Thank you AapnaMakhana!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div>
                  <div className="author-name">Anita Verma</div>
                  <div className="author-location">Bangalore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container text-center">
          <h2 className="section-title">Certified for Quality</h2>
          <p className="section-subtitle">Fully licensed and committed to the highest standards</p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
            <div style={{ padding: '16px 24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '600' }}>
              ✅ FSSAI Certified
            </div>
            <div style={{ padding: '16px 24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '600' }}>
              ✅ MSME Registered
            </div>
            <div style={{ padding: '16px 24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '600' }}>
              🇮🇳 Made in India
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Start Healthy Snacking?</h2>
            <p>Join 50,000+ happy customers who made the switch. Get <strong style={{ color: 'var(--primary)' }}>10% OFF</strong> on your first order!</p>
            <Link to="/shop" className="btn btn-primary btn-lg">Shop All Products →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
