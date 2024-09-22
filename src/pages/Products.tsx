import ProductCard from "../components/ProductCard";
import "../styles/product.css";
import products from "../assets/products.json";
import React, { Key } from "react";

type groupType = keyof typeof products;

const App = () => {
  const [selectedGroup, setSelectedGroup] = React.useState<groupType[]>([Object.keys(products)[0]] as groupType[]);

  const handleSelectedGroup = (group: groupType) => {
    if (selectedGroup.length === 1 && selectedGroup.includes(group))
      return setSelectedGroup([Object.keys(products)[0]] as groupType[]);
    else
      if (selectedGroup.includes(group))
        return setSelectedGroup(selectedGroup.filter((selected) => selected !== group));
      else
        return setSelectedGroup([...selectedGroup, group]);

  };


  const filteredProducts = selectedGroup.flatMap((group) => products[group]);

  return (
    <div className="products">
      <div className="group-buttons">
        {Object.keys(products).map((group) => (
          <button
            key={group}
            className={selectedGroup.includes(group as groupType) ? "selected-group-button" : "group-button"}
            onClick={() => handleSelectedGroup(group as groupType)}
          >
            {group}
          </button>
        ))}
      </div>
      <div className="products">
        {!!filteredProducts.length &&
          filteredProducts.map((product, index: Key) => (
            <ProductCard
              company="company"
              imageUrl={product.img}
              key={index}
              mrpPrice={parseFloat(product.price)}
              originalPrice={Math.floor(Math.random() * 1000)}
              originalStock={Math.floor(Math.random() * 100)}
              productName={product.name}
              stocksLeft={Math.floor(Math.random() * 100)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
