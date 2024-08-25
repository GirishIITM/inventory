import ProductCard from "../components/ProductCard";
import "../styles/product.css"
import products from "../assets/products.json";
import React, { Key, useEffect } from "react";

import { accessSpreadsheet } from "../utils/gsheet";

const App = () => {

  const [selectedGroup, setSelectedGroup] = React.useState<keyof typeof products>(Object.keys(products)[0] as keyof typeof products);
  useEffect(() => {
    // accessSpreadsheet();
  }, [])

  return (
    <div className="products">
      <div className="group-buttons">
        {
          Object.keys(products).map((group) => (
            <button
              key={group}
              className="group-button"
              onClick={() => setSelectedGroup(group as keyof typeof products)}
            >
              {group}
            </button>
          ))
        }
      </div>

      {
        <>
          <div className="products">
            {
              !!selectedGroup && products[selectedGroup].map((product, index: Key) => (
                <ProductCard
                  company="company"
                  imageUrl={product.img}
                  key={index}
                  mrpPrice={+(product.price).slice(2)}
                  originalPrice={Math.floor(Math.random() * 1000)}
                  originalStock={Math.floor(Math.random() * 100)}
                  productName={product.name}
                  stocksLeft={Math.floor(Math.random() * 100)}
                />
              ))
            }
          </div>
        </>
      }

    </div>
  );
};

export default App;
