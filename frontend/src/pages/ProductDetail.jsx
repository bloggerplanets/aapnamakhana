import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data.product); setRelated(data.related); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) {
      toast.info('Please login to add items to cart');
      navigate('/auth');
      return;
    }
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        body: JSON.stringify({ productId: product.id, quantity })
      });
      const data = await res.json();
      if (window.updateCartBadge) window.updateCartBadge(data.itemCount);
      toast.success(`${quantity}x ${product.name} added to cart!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    }
  };

  const buyNow = async () => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) {
      toast.info('Please login to continue');
      navigate('/auth');
      return;
    }
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        body: JSON.stringify({ productId: product.id, quantity })
      });
      const data = await res.json();
      if (window.updateCartBadge) window.updateCartBadge(data.itemCount);
      navigate('/checkout');
    } catch (err) {
      console.error(err);
      toast.error('Failed to process');
    }
  };

  const addToWishlist = async () => {
    const auth = JSON.parse(localStorage.getItem('am_auth'));
    if (!auth) {
      toast.info('Please login to add to wishlist');
      navigate('/auth');
      return;
    }
    try {
      await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
        body: JSON.stringify({ productId: product.id })
      });
      toast.success(`${product.name} added to wishlist!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to wishlist');
    }
  };

  if (loading) return (
    <div className="product-detail-page">
      <div className="container">
        <div className="skeleton-detail">
          <div className="skeleton-img"></div>
          <div className="skeleton-info">
            <div className="skeleton-line w40"></div>
            <div className="skeleton-line w80 h24"></div>
            <div className="skeleton-line w30"></div>
            <div className="skeleton-line w60"></div>
            <div className="skeleton-line w100"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="product-detail-page">
      <div className="container">
        <div className="empty-state">
          <h3>Product not found</h3>
          <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    </div>
  );

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            {discount > 0 && <span className="detail-badge">{discount}% OFF</span>}
          </div>
          <div className="product-detail-info">
            <div className="detail-category">{product.category}</div>
            <h1>{product.name}</h1>
            <div className="detail-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span>{product.rating}</span>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>
            <div className="detail-price">
              <span className="current">₹{product.price}</span>
              {discount > 0 && <span className="original">₹{product.originalPrice}</span>}
              {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
            </div>
            <p className="detail-description">{product.description}</p>

            <div className="detail-stock">
              {product.stock > 10 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : product.stock > 0 ? (
                <span className="low-stock">⚠ Only {product.stock} left - order soon!</span>
              ) : (
                <span className="out-of-stock">✕ Out of Stock</span>
              )}
            </div>

            <div className="detail-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>+</button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={addToCart} disabled={product.stock === 0}>
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="btn btn-accent btn-lg" onClick={buyNow} disabled={product.stock === 0}>
                Buy Now
              </button>
              <button className="btn btn-secondary btn-lg" onClick={addToWishlist}>&#9825;</button>
            </div>

            <div className="detail-meta">
              <div className="meta-item"><span className="meta-icon">🚚</span> Free shipping on orders above ₹499</div>
              <div className="meta-item"><span className="meta-icon">🔄</span> 7-day easy return policy</div>
              <div className="meta-item"><span className="meta-icon">✅</span> 100% quality guaranteed</div>
              <div className="meta-item"><span className="meta-icon">🌱</span> Sourced directly from Bihar</div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="products-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
