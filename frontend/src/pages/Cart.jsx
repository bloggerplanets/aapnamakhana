import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchCart = async () => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) { setLoading(false); return; }
    try {
      const res = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      const data = await res.json();
      setCart(data);
      if (window.updateCartBadge) window.updateCartBadge(data.itemCount);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQuantity = async (productId, quantity, stock) => {
    if (quantity < 1) return;
    if (quantity > stock) {
      toast.warning(`Only ${stock} items available in stock`);
      return;
    }
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    await fetch('/api/cart/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
      body: JSON.stringify({ productId, quantity })
    });
    fetchCart();
  };

  const removeItem = async (productId, name) => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    await fetch(`/api/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${auth.token}` }
    });
    toast.info(`${name} removed from cart`);
    fetchCart();
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'MAKHANA10') {
      setCouponApplied(true);
      toast.success('Coupon applied! 10% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const freeShipping = cart.total >= 499;
  const shippingProgress = Math.min((cart.total / 499) * 100, 100);

  if (!user) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="empty-icon">&#128722;</div>
            <h3>Please login to view your cart</h3>
            <Link to="/auth" className="btn btn-primary">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="cart-page"><div className="container"><div className="loading-spinner" /></div></div>;

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="empty-icon">&#128722;</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any makhana yet</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping &#8594;</Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = couponApplied ? Math.round(cart.total * 0.1) : 0;
  const subtotal = cart.total;
  const shipping = freeShipping ? 0 : 49;
  const tax = Math.round((subtotal - discount) * 0.05);
  const grandTotal = subtotal - discount + shipping + tax;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        {!freeShipping && (
          <div className="shipping-bar">
            <div className="shipping-progress" style={{ width: `${shippingProgress}%` }}></div>
            <p>Add <strong>₹{499 - cart.total}</strong> more for <strong>FREE shipping!</strong> 🚚</p>
          </div>
        )}
        {freeShipping && (
          <div className="shipping-bar free">
            <p>🎉 You've unlocked <strong>FREE shipping!</strong></p>
          </div>
        )}

        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.map(item => item.product && (
              <div className="cart-item" key={item.productId}>
                <div className="item-image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className="item-details">
                  <div className="item-category">{item.product.category}</div>
                  <div className="item-name">{item.product.name}</div>
                  <div className="item-price">₹{item.product.price}</div>
                </div>
                <div className="quantity-selector">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.product.stock)} disabled={item.quantity <= 1}>-</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.product.stock)} disabled={item.quantity >= item.product.stock}>+</button>
                </div>
                <div className="item-total">
                  ₹{item.product.price * item.quantity}
                </div>
                <button className="item-remove" onClick={() => removeItem(item.productId, item.product.name)} title="Remove">&#10005;</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="coupon-section">
              <input
                type="text"
                className="input-field"
                placeholder="Coupon code (Try: MAKHANA10)"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                disabled={couponApplied}
              />
              <button className="btn btn-outline btn-sm" onClick={applyCoupon} disabled={couponApplied || !coupon}>
                {couponApplied ? 'Applied!' : 'Apply'}
              </button>
            </div>

            <div className="summary-row">
              <span>Subtotal ({cart.itemCount} items)</span>
              <span>₹{subtotal}</span>
            </div>
            {couponApplied && (
              <div className="summary-row discount">
                <span>Coupon Discount (10%)</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span className={freeShipping ? 'free-shipping' : ''}>
                {freeShipping ? 'FREE' : '₹49'}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax (GST 5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span className="total-amount">₹{grandTotal}</span>
            </div>
            <button className="btn btn-primary btn-block btn-lg checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout &#8594;
            </button>
            <Link to="/shop" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
