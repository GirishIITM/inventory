import { motion } from 'framer-motion';
import "../styles/product.css"
import { productType } from './types';


const ProductCard = ({ productName, company, mrpPrice, originalPrice, stocksLeft, originalStock, imageUrl }: productType) => {
    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <img src={imageUrl} alt={productName} className="card-image" />
            <div className="card-header">
                <h2 className="card-title">{productName}</h2>
                <p className="card-company">{company}</p>
            </div>
            <div className="card-body">
                <div className="price-container">
                    <p className="selling-price">₹{mrpPrice}</p>
                    <p className="original-price">₹{originalPrice}</p>
                </div>
                <p className="stock">Stocks Left: {stocksLeft}</p>
                <p className="stock">Original Stock: {originalStock}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
