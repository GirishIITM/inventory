import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
                    name="productName"
                    value={product.productName}
                    onChange={handleInputChange}
                    required
                    alt="Product name"
                    placeholder={t("Enter product name")}
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
                    placeholder={t("Enter company name")}
                />
            </div>
            <div>
                <label>{t('MRP Price')}:</label>
                <input
                    type="number"
                    name="mrpPrice"
                    value={product.mrpPrice}
                    onChange={handleInputChange}
                    required
                    alt="MRP price"
                    placeholder={t("Enter MRP price")}
                />
            </div>
            <div>
                <label>{t('Original Price')}:</label>
                <input
                    type="number"
                    name="originalPrice"
                    value={product.originalPrice}
                    onChange={handleInputChange}
                    required
                    alt="Original price"
                    placeholder={t("Enter original price")}
                />
            </div>
            <div>
                <label>{t('Stocks Left')}:</label>
                <input
                    type="number"
                    name="stocksLeft"
                    value={product.stocksLeft}
                    onChange={handleInputChange}
                    required
                    alt="Stocks left"
                    placeholder={t("Enter stocks left")}
                />
            </div>
            <div>
                <label>{t('Original Stock')}:</label>
                <input
                    type="number"
                    name="originalStock"
                    value={product.originalStock}
                    onChange={handleInputChange}
                    required
                    alt="Original stock"
                    placeholder={t("Enter original stock")}
                />
            </div>
            <div>
                <label>{t('Image URL')}:</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleInputChange}
                    required
                    alt="Image URL"
                    placeholder={t("Enter image URL")}
                />
            </div>
            <button type="submit">{t('Save Product')}</button>
        </form>
    );
};

export default CreateProduct;

export interface productType {
    productName: string;
    company: string;
    mrpPrice: number;
    originalPrice: number;
    stocksLeft: number;
    originalStock: number;
    imageUrl: string;
}
