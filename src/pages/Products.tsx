import ProductCard from "../components/ProductCard";
import "../styles/product.css";
import products from "../assets/products.json";
import React, { Key, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { productJsonType } from "../types";
import { useState } from "react";
import { trans } from "../utils/translations";
import { t } from "i18next";

type groupType = keyof typeof products;

const App = () => {
  const [selectedGroup, setSelectedGroup] = useState<groupType[]>([Object.keys(products)[0]] as groupType[]);
  const [searchResults, setSearchResults] = useState<productJsonType[]>([]);
  const [showFilters, setShowFilters] = useState(true); // State to toggle filter buttons

  const handleSelectedGroup = (group: groupType) => {
    if (selectedGroup.length === 1 && selectedGroup.includes(group))
      return setSelectedGroup([Object.keys(products)[0]] as groupType[]);
    else if (selectedGroup.includes(group))
      return setSelectedGroup(selectedGroup.filter((selected) => selected !== group));
    else
      return setSelectedGroup([...selectedGroup, group]);
  };

  const filteredProducts = selectedGroup.flatMap((group) => products[group]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) return [];
    setSearchResults(() => {
      const searchResults = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return searchResults;
    });
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowFilters(false)
    }
  }, [])

  return (
    <div className="products-page">
      <div className="top-bar">
        <button className="toggle-filters" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? t(trans.showFilters) : t(trans.hideFilters)}
        </button>
        <a href="/product/create" className="add-product-button">{t(trans.addProduct)}</a>
      </div>

      {showFilters && (
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
      )}

      <SearchBar onSearch={handleSearch} i18nIsDynamicList />

      <div className="products-grid">
        {!!filteredProducts.length && !searchResults.length &&
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
        {!!searchResults.length &&
          searchResults.map((product, index: Key) => (
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
