import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Aapna Makhana</h1>
          <p>India's Trusted Makhana Brand from Bihar</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="https://www.aapnamakhana.com/assets/images/aapnamakhana.png" alt="Aapna Makhana Factory" />
            </div>
            <div className="about-content">
              <span className="section-badge">Our Story</span>
              <h2>Bihar Se Aapka Ghar Tak</h2>
              <p>Welcome to <strong>Aapna Makhana</strong>, your trusted destination for premium-quality fox nuts sourced directly from the heart of Bihar. Known as the hub of the world's finest makhana, Bihar produces the highest-grade fox nuts, and we bring that purity straight to your home.</p>
              <p>At Aapna Makhana, we focus on <strong>quality, hygiene, and taste</strong>. From sourcing to packaging, every step is carefully managed to ensure you receive fresh, crunchy, and nutritious makhana every time.</p>
              <p>Whether you're looking for a healthy snack, bulk supply, or export-quality products, we deliver excellence with every pack.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-features">
        <div className="container">
          <h2 className="text-center">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h4>Premium Quality</h4>
              <p>Carefully selected makhana sourced from Bihar's best farms, ensuring superior size, taste, and crunch in every pack.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h4>Lab Tested</h4>
              <p>Every batch is quality-checked for purity, hygiene, and nutritional value before reaching you.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h4>Fresh Delivery</h4>
              <p>Direct from our Bihar-based processing unit to maintain maximum freshness and natural taste.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h4>Custom Solutions</h4>
              <p>Bulk supply, packaging, and grading options available for wholesalers, retailers, and exporters.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-certifications">
        <div className="container text-center">
          <h2>Certified for Quality, Trusted for Taste</h2>
          <p>Fully licensed and committed to maintaining the highest quality standards in every makhana we deliver.</p>
          <div className="cert-badges">
            <div className="cert-badge">
              <span className="cert-icon">✅</span>
              <span>FSSAI Certified</span>
            </div>
            <div className="cert-badge">
              <span className="cert-icon">✅</span>
              <span>MSME Registered</span>
            </div>
            <div className="cert-badge">
              <span className="cert-icon">🇮🇳</span>
              <span>Made in India</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container text-center">
          <h2>Ready to Taste the Difference?</h2>
          <p>Experience premium quality makhana sourced directly from Bihar</p>
          <div className="cta-buttons">
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
