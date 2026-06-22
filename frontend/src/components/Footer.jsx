import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="https://www.aapnamakhana.com/assets/images/logo.png" alt="AapnaMakhana" style={{ height: '40px' }} />
              <div>
                <div className="brand-name">AapnaMakhana</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Premium Fox Nuts</div>
              </div>
            </div>
            <p className="brand-desc">
              Premium quality makhana sourced directly from Bihar. Healthy, natural, and hygienically processed fox nuts for everyday snacking and bulk supply.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/aapnamakhana/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589024866871" target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://wa.me/919152150599" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Products</h4>
            <ul>
              <li><Link to="/shop?category=flavored">Roasted Makhana</Link></li>
              <li><Link to="/shop?category=organic">Organic & Raw</Link></li>
              <li><Link to="/shop?category=giftpack">Gift Packs</Link></li>
              <li><Link to="/shop?category=plain">Plain Makhana</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/shop">Shop</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@aapnamakhana.com">info@aapnamakhana.com</a></li>
              <li><a href="tel:+919152150599">+91 9152150599</a></li>
              <li><span>Pandual, Madhubani, Bihar</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} AapnaMakhana.com. All rights reserved.</span>
          <span className="footer-tagline">Premium Quality | 100% Natural | Made in Bihar 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}
