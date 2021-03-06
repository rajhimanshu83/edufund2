import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { TickerSymbols } from "./assets/TickerSymbols";
import { FileSearchOutlined } from '@ant-design/icons';


const SearchBar = ({ handleSearch }) => {
  const [stocks, setStocks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  useEffect(() => {
    const regex = new RegExp(`^${inputValue.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')}`, "i");
    setStocks(
      TickerSymbols.filter((val) => regex.test(val.symbol)).slice(0, 11)
    );
  }, [inputValue]);

  return (
    <div className={styles.container}>
      <input
      placeholder="PICK A SYMBOL..."
        className={styles.input}
        list="stock-picker"
        type="text"
        value={inputValue}
        onChange={(e) =>
          e.target.value.length <= 5
            ? setInputValue(e.target.value.toUpperCase())
            : setInputValue(inputValue)
        }
      />
      <datalist id="stock-picker">
        {inputValue.length &&
          stocks.map((val) => (
            <option
              key={val.symbol}
              value={val.symbol}
              label={val.name}
            ></option>
          ))}
      </datalist>
      <button
        className="searchButton"
        style={{width:"40px"}}
        onClick={() => {handleSearch(inputValue); setInputValue("")}}
      >
   <FileSearchOutlined />      
</button>
    </div>
  );
};

export default SearchBar;
