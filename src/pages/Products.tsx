import ProductCard from "../components/ProductCard";
import "../styles/product.css"

const prodcutImg = "data:image/jpeg;base64,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"

const App = () => {
  return (
    <div className="products">
      {new Array(5).fill(1).map((e, i) => (
        <ProductCard
          key={i}
          productName="Product A"
          company="Company XYZ"
          mrpPrice={999}
          originalPrice={1199}
          stocksLeft={20}
          originalStock={50}
          imageUrl={prodcutImg}
        />
      ))}
    </div>
  );
};

export default App;
