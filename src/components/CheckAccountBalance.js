import React, { useEffect, useState } from "react";
import "../css/CheckAccountBalance.css";
import { readFireStore } from "../server/firebase";
import PaymentHistoryList from "./PaymentHistoryList";
import PaymentHistoryListItem from "./PaymentHistoryListItem";

function CheckAccountBalance({user}){
    const [balance, setBalance] = useState(0);
    const [returns, setReturns] = useState([]);
    useEffect(()=>{
        getBalance();
    },[]);

    async function getBalance(){
        const query = {var_name:"market_no", operator:"==", data:user};
        await readFireStore("market", query).then(res => {
            res.forEach(data => {
                setBalance(data.data().account_balance);
            })
        })
        getApprovedReturns();
    }
    console.log(returns);

    function getApprovedReturns(){
        const query = {var_name:"market_no", operator:"==", data:user};
        readFireStore("return", query).then(res => {
            res.forEach(data => {
                if(data.data().return_state){
                    setReturns(returns => [...returns, data.data()]);
                }
            })
        })
    }

    function getPaymentHistory(){
        const list = [];
        returns.map((data, index) => {
            list.push(<PaymentHistoryListItem key={index} name={data.customer_name} price={0}/>)
        });
        return list;
    }

    return(
        <div id="CheckAccountBalance">
            <div id="CheckAccountBalanceWrap">
                <div id="CheckAccountBalanceContentsWrap">
                    <div id="CheckAccountBalanceContents">{`${balance} 원`}</div>
                    <PaymentHistoryList>
                        {getPaymentHistory()}
                    </PaymentHistoryList>
                </div>
            </div>
        </div>
    )
}

export default CheckAccountBalance;