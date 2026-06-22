import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) { setLoading(false); return; }
    try {
      const res = await fetch('/api/wishlist', { headers: { 'Authorization': `Bearer ${auth.token}` } });
      const data = await res.json();
      setItems(data.items);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchWishlist(); }, []);

  const removeItem = async (productId) => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    await fetch(`/api/wishlist/remove/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${auth.token}` }
    });
    fetchWishlist();
  };

  const moveToCart = async (productId) => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    await fetch(`/api/wishlist/remove/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${auth.token}` }
    });
    fetchWishlist();
    if (window.updateCartBadge) {
      const cartRes = await fetch('/api/cart', { headers: { 'Authorization': `Bearer ${auth.token}` } });
      const cartData = await cartRes.json();
      window.updateCartBadge(cartData.itemCount);
    }
  };

  if (!user) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="empty-icon">&#9825;</div>
            <h3>Please login to view your wishlist</h3>
            <Link to="/auth" className="btn btn-primary">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="cart-page"><div className="container"><div className="loading-spinner" /></div></div>;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>
          My Wishlist ({items.length})
        </h1>
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">&#9825;</div>
            <h3>Your wishlist is empty</h3>
            <p>Save items you love for later</p>
            <Link to="/shop" className="btn btn-primary">Explore Products &#8594;</Link>
          </div>
        ) : (
          <div className="cart-items">
            {items.map(product => (
              <div className="cart-item" key={product.id}>
                <Link to={`/product/${product.id}`} className="item-image">
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="item-details">
                  <div className="item-category">{product.category}</div>
                  <Link to={`/product/${product.id}`} className="item-name">{product.name}</Link>
                  <div className="item-price">₹{product.price}</div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => moveToCart(product.id)}>Move to Cart</button>
                <button className="item-remove" onClick={() => removeItem(product.id)}>&#10005;</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
