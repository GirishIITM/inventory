import React, { useState } from 'react';
import { trans } from '../utils/translations';
import { t } from 'i18next';
import '../styles/add_product.css';
import { productType } from '../types';


const AddProduct: React.FC = () => {
  const [newProduct, setNewProduct] = useState<productType>({
    productName: '',
    company: '',
    mrpPrice: 0,
    originalPrice: 0,
    stocksLeft: 0,
    originalStock: 0,
    imageUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can send the product data to the server or update your app's state
    console.log('New product added:', newProduct);
    // After submission, you may want to clear the form
    setNewProduct({
      productName: '',
      company: '',
      mrpPrice: 0,
      originalPrice: 0,
      stocksLeft: 0,
      originalStock: 0,
      imageUrl: ''
    });
  };

  return (
    <div className="add-product-container">
      <h2>{t(trans.addProduct)}</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="productName">{t(trans.productName)}</label>
          <input
            className='editable-input'
            type="text"
            id="productName"
            name="productName"
            value={newProduct.productName}
            onChange={handleChange}
            placeholder={t(trans.enterProductName)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">{t(trans.company)}</label>
          <input
            className='editable-input'
            type="text"
            id="company"
            name="company"
            value={newProduct.company}
            onChange={handleChange}
            placeholder={t(trans.enterCompanyName)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mrpPrice">{t(trans.mrpPrice)}</label>
          <input
            className='editable-input'
            type="number"
            id="mrpPrice"
            name="mrpPrice"
            value={newProduct.mrpPrice}
            onChange={handleChange}
            placeholder={t(trans.enterMrpPrice)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="originalPrice">{t(trans.originalPrice)}</label>
          <input
            className='editable-input'
            type="number"
            id="originalPrice"
            name="originalPrice"
            value={newProduct.originalPrice}
            onChange={handleChange}
            placeholder={t(trans.enterOriginalPrice)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stocksLeft">{t(trans.stocksLeft)}</label>
          <input
            className='editable-input'
            type="number"
            id="stocksLeft"
            name="stocksLeft"
            value={newProduct.stocksLeft}
            onChange={handleChange}
            placeholder={t(trans.enterStocksLeft)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="originalStock">{t(trans.originalStock)}</label>
          <input
            className='editable-input'
            type="number"
            id="originalStock"
            name="originalStock"
            value={newProduct.originalStock}
            onChange={handleChange}
            placeholder={t(trans.enterOriginalStock)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">{t(trans.imageUrl)}</label>
          <input
            className='editable-input'
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleChange}
            placeholder={t(trans.enterImageUrl)}
            required
          />
        </div>

        <button type="submit" className="submit-btn btn1">
          {t(trans.saveProduct)}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
