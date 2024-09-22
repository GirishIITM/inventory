import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trans } from '../utils/translations';
import { productType } from './types';

const CreateProduct: React.FC = () => {
    const { t } = useTranslation();
    const [product, setProduct] = useState<productType>({
        productName: '',
        company: '',
        mrpPrice: 0,
        originalPrice: 0,
        stocksLeft: 0,
        originalStock: 0,
        imageUrl: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: name === 'mrpPrice' || name === 'originalPrice' || name === 'stocksLeft' || name === 'originalStock'
                ? parseFloat(value)
                : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform submit logic here

        // Reset product state
        setProduct({
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>{t('Product Name')}:</label>
                <input
                    type="text"
                    name={trans.productName}
                    value={product.productName}
                    onChange={handleInputChange}
                    required
                    alt="Product name"
                    placeholder={t(trans.enterProductName)}
                />
            </div>
            <div>
                <label>{t('Company')}:</label>
                <input
                    type="text"
                    name="company"
                    value={product.company}
                    onChange={handleInputChange}
                    required
                    alt="Company"
                    placeholder={t(trans.enterCompanyName)}
                />
            </div>
            <div>
                <label>{t(trans.mrpPrice)}:</label>
                <input
                    type="number"
                    name="mrpPrice"
                    value={product.mrpPrice}
                    onChange={handleInputChange}
                    required
                    alt="MRP price"
                    placeholder={t(trans.enterMrpPrice)}
                />
            </div>
            <div>
                <label>{t(trans.originalPrice)}:</label>
                <input
                    type="number"
                    name="originalPrice"
                    value={product.originalPrice}
                    onChange={handleInputChange}
                    required
                    alt="Original price"
                    placeholder={t(trans.originalPrice)}
                />
            </div>
            <div>
                <label>{t(trans.stocksLeft)}:</label>
                <input
                    type="number"
                    name="stocksLeft"
                    value={product.stocksLeft}
                    onChange={handleInputChange}
                    required
                    alt="Stocks left"
                    placeholder={t(trans.enterStocksLeft)}
                />
            </div>
            <div>
                <label>{t(trans.originalStock)}:</label>
                <input
                    type="number"
                    name="originalStock"
                    value={product.originalStock}
                    onChange={handleInputChange}
                    required
                    alt="Original stock"
                    placeholder={t(trans.enterOriginalStock)}
                />
            </div>
            <div>
                <label>{t(trans.imageUrl)}:</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleInputChange}
                    required
                    alt="Image URL"
                    placeholder={t(trans.enterImageUrl)}
                />
            </div>
            <button type="submit">{t(trans.saveProduct)}</button>
        </form>
    );
};

export default CreateProduct;
