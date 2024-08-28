import ProductCard from "../components/ProductCard";
import "../styles/product.css"
import products from "../assets/products.json";
import React, { Key, useEffect } from "react";
import { MenuItem, Select } from "@mui/material";

type groupType = keyof typeof products;
const App = () => {

  const [selectedGroup, setSelectedGroup] = React.useState<groupType[]>([Object.keys(products)[0]] as groupType[]);
  const handleSelectedGroup = (group: groupType) => {
    if (selectedGroup.includes(group) && selectedGroup.length > 1) {
      setSelectedGroup(selectedGroup.filter((selected) => selected !== group));
    } else {
      setSelectedGroup([...selectedGroup, group]);
    }
  }

  return (
    <div className="products">
      <div className="group-buttons">
        {
          Object.keys(products).map((group) => (
            <button
              key={group}
              className={selectedGroup.includes(group as groupType) ? "selected-group-button" : "group-button"}
              onClick={() => handleSelectedGroup(group as groupType)}
            >
              {group}
            </button>
          ))
        }
      </div>

      <div className="group-buttons-mobile">
        <Select
          value={selectedGroup}
          label="group"
          multiple={true}
          onChange={(e) => setSelectedGroup(e.target.value as groupType[])}
        >
          {
            Object.keys(products).map((group) => (
              <MenuItem key={group} value={group}>{group}</MenuItem>
            ))
          }
        </Select>
      </div>

      {
        <>
          <div className="products">
            {
              !!selectedGroup.length && Object.values(products).flat().map((product, index: Key) => (
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
