import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { name, price, image, description, _id } = product;

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }

      await API.post('/cart', {
        productId: _id,
        quantity: 1,
      });

      alert(`Added ${name} to the cart.`);
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding to cart.');
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">${price}</span>
          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="view-details-btn" onClick={handleViewDetails}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
