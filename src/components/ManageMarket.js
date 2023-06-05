import React, { useEffect, useState } from "react";
import "../css/ManageMarket.css";
import ListView from "./ListView";
import { readFireStore } from "../server/firebase";
import ListItem from "./ListItem";
import MarketDetail from "./MarketDetail";

function ManageMarket(){
    const [market_list, setMarketList] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    useEffect(() =>{
       getMarketList();
    },[])

    useEffect(() => {
        if(market_list.length !== 0){
            setSelectedItem(market_list[0].market_no);
        }
    }, [market_list])

    function getMarketList(){
        readFireStore("market").then(res => {
            res.forEach(data =>{
                setMarketList(market => [...market, data.data()]);
            })
        })
    }

    function setItemList(){
        const list = market_list.map((data, index) => {
            return <ListItem key={index} value={data.market_no} selectedItem={selectedItem} setSelectedItem={setSelectedItem} title={data.market_name} contents={data.market_no}/>
        })
        return list;
    }
    return(
        <div id="ManageMarket">
            {market_list.length !== 0 ?<ListView listTitle={"마켓 목록"}>
                {setItemList()}
            </ListView> : null}
            <div id="ManageMarketContents">
                {selectedItem ? <MarketDetail marketNo={selectedItem}/> : null }
            </div>
        </div>
    )
}

export default ManageMarket;