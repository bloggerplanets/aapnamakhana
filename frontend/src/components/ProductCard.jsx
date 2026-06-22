import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './Toast';

export default function ProductCard({ product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) {
      toast.info('Please login to add items to cart');
      navigate('/auth');
      return;
    }
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      const data = await res.json();
      if (window.updateCartBadge) window.updateCartBadge(data.itemCount);
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    }
  };

  const addToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) {
      toast.info('Please login to add items to wishlist');
      navigate('/auth');
      return;
    }
    try {
      await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({ productId: product.id })
      });
      toast.success(`${product.name} added to wishlist!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to wishlist');
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount > 0 && <span className="product-badge">{discount}% OFF</span>}
        {product.stock <= 5 && product.stock > 0 && <span className="stock-badge">Only {product.stock} left!</span>}
        {product.stock === 0 && <span className="stock-badge out">Out of Stock</span>}
        <div className="product-actions">
          <button onClick={addToWishlist} title="Add to Wishlist" className="action-btn">&#9825;</button>
          <button onClick={addToCart} title="Add to Cart" className="action-btn">&#128722;</button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="product-price">
          <span className="current-price">₹{product.price}</span>
          {discount > 0 && <span className="original-price">₹{product.originalPrice}</span>}
          {discount > 0 && <span className="discount">{discount}% off</span>}
        </div>
      </div>
    </Link>
  );
}
