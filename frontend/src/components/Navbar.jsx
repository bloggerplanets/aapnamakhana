import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('am_cart_count');
    if (saved) setCartCount(Number(saved));
  }, []);

  useEffect(() => {
    window.updateCartBadge = (count) => {
      setCartCount(count);
      localStorage.setItem('am_cart_count', count);
    };
    return () => { delete window.updateCartBadge; };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const handleNav = (path) => {
    navigate(path);
    closeMobile();
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <img src="https://www.aapnamakhana.com/assets/images/logo.png" alt="AapnaMakhana" className="logo-img" />
          <div className="brand-text-wrap">
            <span className="brand-text">AapnaMakhana</span>
            <span className="brand-tagline">Premium Fox Nuts</span>
            <span className="hero-badge">★ Bihar's Premium Makhana Brand</span>
          </div>
        </Link>

        <ul className={`navbar-nav ${mobileOpen ? 'open' : ''}`}>
            <li><NavLink to="/" end onClick={closeMobile}>Home</NavLink></li>
            <li><NavLink to="/shop" onClick={closeMobile}>Shop</NavLink></li>
            <li><NavLink to="/about" onClick={closeMobile}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMobile}>Contact</NavLink></li>
            {user && <li><NavLink to="/account" onClick={closeMobile}>Account</NavLink></li>}
            {user?.role === 'admin' && <li><NavLink to="/admin" onClick={closeMobile}>Admin</NavLink></li>}
          </ul>

          <div className="navbar-actions">
            {user && (
              <Link to="/wishlist">
                <button title="Wishlist">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </Link>
            )}
            <Link to="/cart" className="cart-link">
              <button title="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </Link>
            {user ? (
              <button onClick={() => { logout(); navigate('/'); closeMobile(); }} className="nav-btn-text">
                Logout
              </button>
            ) : (
              <Link to="/auth">
                <button className="nav-btn-text">Login</button>
              </Link>
            )}
            <button
              className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && <div className="mobile-overlay" onClick={closeMobile} />}

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="navbar-brand" onClick={closeMobile}>
            <img src="https://www.aapnamakhana.com/assets/images/logo.png" alt="AapnaMakhana" className="logo-img" />
            <div>
              <span className="brand-text">AapnaMakhana</span>
              <span className="brand-tagline">Premium Fox Nuts</span>
            </div>
          </Link>
          <button className="mobile-close" onClick={closeMobile} aria-label="Close menu">&times;</button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/" onClick={closeMobile}>Home</Link>
          <Link to="/shop" onClick={closeMobile}>Shop</Link>
          <Link to="/about" onClick={closeMobile}>About Us</Link>
          <Link to="/contact" onClick={closeMobile}>Contact</Link>
          {user && <Link to="/account" onClick={closeMobile}>My Account</Link>}
          {user && <Link to="/wishlist" onClick={closeMobile}>Wishlist</Link>}
          {user && <Link to="/cart" onClick={closeMobile}>Cart</Link>}
          {user?.role === 'admin' && <Link to="/admin" onClick={closeMobile}>Admin Panel</Link>}
        </div>
        <div className="mobile-menu-footer">
          {user ? (
            <button className="btn btn-primary btn-block" onClick={() => { logout(); navigate('/'); closeMobile(); }}>
              Logout
            </button>
          ) : (
            <Link to="/auth" onClick={closeMobile}>
              <button className="btn btn-primary btn-block">Login / Sign Up</button>
            </Link>
          )}
          <a href="tel:+919152150599" className="mobile-contact-link">Call: +91 9152150599</a>
        </div>
      </div>
    </>
  );
}
