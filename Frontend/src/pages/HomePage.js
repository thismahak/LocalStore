import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './HomePage.css';
import API from '../api'; // Use the configured axios instance

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/products')
      .then((response) => {
        setProducts(response.data);
        console.log('Products loaded:', response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-title">Our Products</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
