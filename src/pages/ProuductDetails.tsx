import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import "../styles/product_details.css";
import { t } from 'i18next';
import { trans } from '../utils/translations';
import { ProductType } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`/api/products/${id}`);
        // const data = await response.json();
        const data = {
          "productName": "Product Name",
          "company": "Company Name",
          "mrpPrice": 500,
          "originalPrice": 700,
          "stocksLeft": 20,
          "originalStock": 50,
          "imageUrl": "https://m.media-amazon.com/images/I/61zKERr1vxL._AC_UL320_.jpg",
          "description": "Detailed description of the product"
        }

        setProduct(data);
        setEditedProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("Saving edited product:", editedProduct);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedProduct({
      ...editedProduct!,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  return (<motion.div
    className="product-details"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <div className="details-header">
      <h2 className="details-title">
        {isEditing ? (
          <input
            type="text"
            name="productName"
            value={editedProduct!.productName}
            onChange={handleChange}
            className="editable-input"
          />
        ) : (
          t(trans.productName)
        )}
      </h2>
      <button onClick={handleEditClick} className="btn1">
        {!isEditing ? t(trans.editProduct) : t(trans.saveProduct)} {/* Adjust text as needed */}
      </button>
    </div>
    <div className="details-content">
      <img
        src={editedProduct!.imageUrl}
        alt={t(trans.imageUrl)}
        className="details-image"
      />
      <div className="details-info">
        <p className="details-company">
          {isEditing ? (
            <input
              type="text"
              name="company"
              value={editedProduct!.company}
              onChange={handleChange}
              className="editable-input"
            />
          ) : (
            t(trans.company)
          )}
        </p>
        <div className="details-pricing">
          <p className="details-selling-price">
            {t(trans.mrpPrice)} ₹ {isEditing ? (
              <input
                type="number"
                name="mrpPrice"
                value={editedProduct!.mrpPrice}
                onChange={handleChange}
                className="editable-input"
              />
            ) : (
              product.mrpPrice
            )}
          </p>
          <p className="details-original-price">
            {t(trans.originalPrice)} ₹ {isEditing ? (
              <input
                type="number"
                name="originalPrice"
                value={editedProduct!.originalPrice}
                onChange={handleChange}
                className="editable-input"
              />
            ) : (
              product.originalPrice
            )}
          </p>
        </div>
        <p className="details-stock">
          {t(trans.stocksLeft)}: {isEditing ? (
            <input
              type="number"
              name="stocksLeft"
              value={editedProduct!.stocksLeft}
              onChange={handleChange}
              className="editable-input"
            />
          ) : (
            product.stocksLeft
          )}
        </p>
        <p className="details-original-stock">
          {t(trans.originalStock)}: {isEditing ? (
            <input
              type="number"
              name="originalStock"
              value={editedProduct!.originalStock}
              onChange={handleChange}
              className="editable-input"
            />
          ) : (
            product.originalStock
          )}
        </p>
      </div>
    </div>
    <div className="details-description">
      <p>
        {isEditing ? (
          <textarea
            name="description"
            value={editedProduct!.description || ''}
            onChange={handleChange}
            className="editable-textarea"
          />
        ) : (
          t(trans.description) || t(trans['No description available.'])
        )}
      </p>
    </div>
  </motion.div>
  );
};

export default ProductDetails;
