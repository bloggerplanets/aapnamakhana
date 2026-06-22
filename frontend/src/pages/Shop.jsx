import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || '';

  useEffect(() => {
    fetch('/api/products/categories').then(r => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (currentCategory !== 'all') params.set('category', currentCategory);
    if (currentSort) params.set('sort', currentSort);
    if (debouncedSearch) params.set('search', debouncedSearch);

    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(data => { setProducts(data.products); setLoading(false); })
      .catch(() => setLoading(false));
  }, [currentCategory, currentSort, debouncedSearch]);

  const handleCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const handleSort = (sort) => {
    const params = new URLSearchParams(searchParams);
    if (sort) params.set('sort', sort);
    else params.delete('sort');
    setSearchParams(params);
  };

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '4px' }}>
              {currentCategory === 'all' ? 'All Products' : categories.find(c => c.id === currentCategory)?.name || 'Products'}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>{products.length} products found</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="search-bar">
              <span className="search-icon">&#128269;</span>
              <input
                type="text"
                placeholder="Search makhana..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="sort-select" value={currentSort} onChange={(e) => handleSort(e.target.value)}>
              <option value="">Sort by</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="shop-filters" style={{ marginBottom: '32px' }}>
          <button className={`filter-btn ${currentCategory === 'all' ? 'active' : ''}`} onClick={() => handleCategory('all')}>All</button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${currentCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="products-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="product-card skeleton-card">
                <div className="skeleton-img" style={{ height: '220px', borderRadius: '12px 12px 0 0' }}></div>
                <div style={{ padding: '16px' }}>
                  <div className="skeleton-line w40" style={{ marginBottom: '8px' }}></div>
                  <div className="skeleton-line w80" style={{ marginBottom: '12px' }}></div>
                  <div className="skeleton-line w60"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">&#128269;</div>
            <h3>No products found</h3>
            <p>{search ? `No results for "${search}"` : 'Try adjusting your filters'}</p>
            {search && (
              <button className="btn btn-outline" onClick={() => setSearch('')}>Clear Search</button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
