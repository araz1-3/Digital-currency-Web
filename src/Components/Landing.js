import React,{useState,useEffect} from 'react';

import {getCoin} from "../Services/api";
import Loader from "./loader";
import Coin from "./coin";

import styled from "./Landing.module.css"

const Landing = () => {

    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState("")
    const [select, setSelect] = useState("higher")

    useEffect(() => {
        const FetchAPI = async () => {
            const data = await getCoin()
            console.log(data)
            setCoins(data)
        }
        FetchAPI()
    }, [])

    const searchHandler = (event) => {
        setSearch(event.target.value)
    }


    const selectHandler = (event) => {
        setSelect(event.target.value)
    }

    let searchFilter = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))


    return (
        <>
            {
                coins.length ?
                    <div className={styled.main}>
                        <div className={styled.Container}>
                            <h2 className={styled.title}>Coins</h2>
                            <div className={styled.searchDiv}>
                                <input className={styled.inputSearch} type="text" value={search}
                                       onChange={searchHandler}
                                       placeholder="search here..."/>
                                <div className={styled.sort}>
                                    <label>Sort By:</label>
                                    <select value={select} onChange={selectHandler}>
                                        <option value="higher">Higher Market Cap</option>
                                        <option value="lower">Lower Market Cap</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styled.Label}>
                                <span className={styled.name}>Name</span>
                                <span className={styled.symbol}>Symbol</span>
                                <span className={styled.price}>Price</span>
                                <span>Percentage</span>
                                <span>Market Cap</span>
                            </div>
                            <div className={select === "lower" ? styled.Coins : ''}>
                                {
                                    searchFilter.map(coin =>
                                        <Coin
                                            key={coin.id}
                                            name={coin.name}
                                            image={coin.image}
                                            price_change_percentage_24h={coin.price_change_percentage_24h}
                                            current_price={coin.current_price}
                                            symbol={coin.symbol}
                                            market_cap={coin.market_cap}
                                        />)
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <Loader/>
            }
        </>
    );
}

export default Landing;