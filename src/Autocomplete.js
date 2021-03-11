import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import { useDebounce } from "use-debounce";

import "./Autocomplete.css";
// Set number of items in autocomplete list
const suggestionArraySize = 10;

const Autocomplete = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchTermValue] = useDebounce(searchTerm, 500);
    
  const fetchApiCall = async () => {
    try{
    await fetchSuggestions(searchTerm).then((_suggestions) =>
      setSuggestions(_suggestions)
    );
    } catch (e) {

    }
  }; 
  /*
  const changeText = (val) => {
    setSearchTerm(val);
    setSuggestions([{id:5, title:val}, {id:3, title:'new val'}]);
  }*/
  useEffect(() => {
    if(searchTerm){
      fetchApiCall();
      //setSuggestions([{id:5, title:searchTerm}, {id:3, title:'new val'}]);
    }

  }, [searchTerm]);

  // Onclick function for search items
  const productSelect = (id) => {
    //console.log(id);
    props.getProductID(id);
    setSearchTerm('');
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
      {!!suggestions ? (
        <ul className="suggestionsList">
          {suggestions.map((item) => (
            <li key={item.id} data-testid={item.id}  onClick={(e) => productSelect(item.id)}>
              {item.title}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Autocomplete;
