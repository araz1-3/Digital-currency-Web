import React from 'react';

import styles from "./coin.module.css"

const Coin = ({symbol,image,price_change_percentage_24h,current_price,name,market_cap}) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={image} alt={name}/>
            <span className={styles.name}>{name}</span>
            <span className={styles.symbol}>{symbol}</span>
            <span className={styles.price}>${current_price.toLocaleString()}</span>
            <span className={price_change_percentage_24h > 0 ?styles.greenPriceChange:styles.redPriceChange}>{price_change_percentage_24h.toFixed(2)}%</span>
            <span className={styles.market}>${market_cap.toLocaleString()}</span>
        </div>
    );
};

export default Coin;