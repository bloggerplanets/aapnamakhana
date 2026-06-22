import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useToast } from './components/Toast';
import ToastContainer from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const { toasts } = useToast();

  const marqueeItems = [
    'FREE SHIPPING ON ORDERS ABOVE ₹499',
    '✓ 100% NATURAL INGREDIENTS',
    '⚡ DELIVERED IN 2-4 DAYS',
    '⭐ 50,000+ HAPPY CUSTOMERS',
    '🔒 SECURE PAYMENTS',
    '🏆 INDIA\'S #1 MAKHANA BRAND',
    'EASY RETURNS WITHIN 7 DAYS',
    '🌿 SOURCED DIRECTLY FROM BIHAR'
  ];

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
        <Navbar />
        <ToastContainer toasts={toasts} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Chatbot />
      </BrowserRouter>
    </AuthProvider>
  );
}
