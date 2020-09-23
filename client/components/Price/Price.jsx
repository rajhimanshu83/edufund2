import React, { useEffect, useState } from "react";
import styles from "./Price.module.css";
import { fetchCurrentPrice } from "../../lib";

const Price = ({ deviation, returns }) => {
  // const [currentPrice, setCurrentPrice] = useState(0);
  // useEffect(() => {
  //   const fetch = async () => {
  //     setCurrentPrice(await fetchCurrentPrice(ticker));
  //   };
  //   fetch();
  // }, [ticker]);
  return (
    <div className={styles.container}>
      <p className={styles.price}><span style={{color:"cyan",marginRight:"10px"}}>Std Deviation:</span>{deviation}%</p>
      <p className={styles.price} style={{marginLeft:"20px"}}><span style={{color:"cyan",marginRight:"10px"}}>Return:</span>{returns}%</p>
    </div>
  );
};

export default Price;
