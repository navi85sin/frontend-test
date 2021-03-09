import React, { useState } from "react";

import "./App.css";

import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

const App = () => {
  const [productId, productIdSet] = useState("");
  // Set the product ID from child component
  const getProductID = (val) => {
    productIdSet(val);
  };

  return (
    <div className="App">
      <Autocomplete getProductID={getProductID} />
      <ProductDetail productId={productId} />
    </div>
  );
};

export default App;
