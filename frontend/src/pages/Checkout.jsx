import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const addresses = [
    { id: 0, type: 'Home', street: '123 MG Road, Andheri West', city: 'Mumbai', state: 'Maharashtra', postalCode: '400058', phone: '9876543210' },
    { id: 1, type: 'Office', street: '456 BKC, Bandra East', city: 'Mumbai', state: 'Maharashtra', postalCode: '400051', phone: '9876543211' }
  ];

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) { navigate('/auth'); return; }
    fetch('/api/cart', { headers: { 'Authorization': `Bearer ${auth.token}` } })
      .then(r => r.json())
      .then(setCart);
  }, []);

  const tax = Math.round(cart.total * 0.05);
  const shipping = cart.total >= 499 ? 0 : 49;
  const grandTotal = cart.total + tax + shipping;

  const handlePayment = async () => {
    setProcessing(true);
    setShowPaymentModal(true);

    // Simulate Razorpay payment flow
    setTimeout(() => {
      const auth = JSON.parse(localStorage.getItem('am_auth'));
      fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        body: JSON.stringify({
          items: cart.items.map(i => ({ productId: i.productId, name: i.product.name, quantity: i.quantity, price: i.product.price })),
          address: `${addresses[selectedAddress].street}, ${addresses[selectedAddress].city}, ${addresses[selectedAddress].state} - ${addresses[selectedAddress].postalCode}`,
          paymentMethod
        })
      })
        .then(r => r.json())
        .then(data => {
          setOrderId(data.order.id);
          setOrderSuccess(true);
          setProcessing(false);
          if (window.updateCartBadge) window.updateCartBadge(0);
        });
    }, 2500);
  };

  if (orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div style={{ maxWidth: '500px', margin: '60px auto' }}>
            <div className="success-animation">
              <div className="checkmark">&#10003;</div>
              <h2 style={{ marginBottom: '12px' }}>Order Placed Successfully!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Thank you for shopping with AapnaMakhana</p>
              <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.1rem', marginBottom: '24px' }}>Order ID: {orderId}</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => navigate('/account')}>View Orders</button>
                <button className="btn btn-secondary" onClick={() => navigate('/shop')}>Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>Checkout</h1>
        <div className="checkout-layout">
          <div>
            <div className="checkout-section">
              <h3>&#128205; Shipping Address</h3>
              {addresses.map(addr => (
                <div
                  key={addr.id}
                  className={`address-card ${selectedAddress === addr.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAddress(addr.id)}
                >
                  <div className="address-type">{addr.type}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Phone: {addr.phone}</div>
                </div>
              ))}
            </div>

            <div className="checkout-section">
              <h3>&#128179; Payment Method</h3>
              <div className="payment-methods">
                {[
                  { id: 'upi', icon: '📱', name: 'UPI (GPay, PhonePe, Paytm)' },
                  { id: 'card', icon: '💳', name: 'Credit / Debit Card' },
                  { id: 'netbanking', icon: '🏦', name: 'Net Banking' },
                  { id: 'cod', icon: '💵', name: 'Cash on Delivery' }
                ].map(method => (
                  <div
                    key={method.id}
                    className={`payment-option ${paymentMethod === method.id ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <span className="payment-icon">{method.icon}</span>
                    <span>{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            {cart.items.map(item => item.product && (
              <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item.product.name} x {item.quantity}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
            <div className="summary-row" style={{ borderTop: '1px solid var(--border)', marginTop: '12px', paddingTop: '12px' }}>
              <span>Subtotal</span><span>₹{cart.total}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5% GST)</span><span>₹{tax}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? 'var(--success)' : 'inherit' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span className="total-amount">₹{grandTotal}</span>
            </div>
            <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: '20px' }} onClick={handlePayment} disabled={processing}>
              {processing ? 'Processing...' : `Pay ₹${grandTotal}`}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
              &#128274; Secured by Razorpay (Mock)
            </p>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => !processing && setShowPaymentModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {!processing ? (
              <>
                <h3>Payment Processing</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Please wait...</p>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'pulse 1s infinite' }}>💳</div>
                <h3>Processing Payment...</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Connecting to Razorpay (Mock)</p>
                <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg-card)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  UPI / Card / Net Banking
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
