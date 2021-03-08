import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import { useDebounce } from 'use-debounce';

import "./Autocomplete.css";
// Set number of items in autocomplete list
const suggestionArraySize = 10;

const Autocomplete = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchTermValue] = useDebounce(searchTerm, 500);
 
  useEffect(() => {
    if (searchTermValue) {
      fetchSuggestions(searchTermValue).then((_suggestions) =>
        setSuggestions(_suggestions)
      );
    }
  }, [searchTermValue]);

 // Onclick function for search items
  const productSelect = (e, id) => {
     setSearchTerm('');
     setSuggestions('');
     // Set value to parent component
     props.getProductID(id);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {!!(suggestions)?
      <ul className="suggestionsList">
        {suggestions.slice(0, suggestionArraySize).map((item) => (
          <li 
            key ={item.id} 
            onClick={e => productSelect(e, item.id)}>
            {item.title}
          </li>
        ))}
      </ul> 
      : "" }
    </div>
  );
}

export default Autocomplete;
