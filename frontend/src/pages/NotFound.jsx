import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-emoji">🥜</div>
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <span className="not-found-sub">The page you're looking for doesn't exist or has been moved.</span>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/shop" className="btn btn-outline">Browse Products</Link>
        </div>
      </div>
    </div>
  );
}
