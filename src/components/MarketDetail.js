import React, { useEffect, useState } from "react";
import { readFireStore } from "../server/firebase";
import { decrypto } from "../functions/crypto";
import "../css/MarketDetail.css";
import ReturnChart from "./ReturnChart";

function MarketDetail({marketNo}){
    const [market, setMarket] = useState({
        market_name:'',
        market_no:'',
        market_email:'',
        market_phone:'',
        market_owner:'',
        id:'',
        pw:'',
        uid:''
    });
    useEffect(() => {
        getMarket();
    }, [marketNo])

    function getMarket(){
        const query = {var_name:"market_no", operator:"==", data:marketNo};
        readFireStore("auth", query).then(res => {
            res.forEach(data => {
                const phone = decrypto(data.data().market_phone);
                const password = decrypto(data.data().password);
                setMarket({
                    market_name:data.data().market_name,
                    market_no:data.data().market_no,
                    market_email:data.data().email,
                    market_phone:phone,
                    market_owner:data.data().ceo,
                    id:data.data().id,
                    pw:password,
                    uid:data.data().uid
                })
            })
        })
    }
    console.log(market);
    return(
        <div id="MarketDetail">
            <div id="MarketDetailWrap">
                <table id="MarketDetailTable">
                <thead><tr><td colSpan={"2"}>업체 정보</td></tr></thead>
                <tbody>
                    <tr>
                        <th>업체 명</th><td>{market.market_name}</td>
                    </tr>
                    <tr>
                        <th>사업자 번호</th><td>{market.market_no}</td>
                    </tr>
                    <tr>
                        <th>소유자</th><td>{market.market_owner}</td>
                    </tr>
                    <tr>
                        <th>전화번호</th><td>{market.market_phone}</td>
                    </tr>
                    <tr>
                        <th>이메일</th><td>{market.market_email}</td>
                    </tr>
                    <tr>
                        <th>비밀번호</th><td>{market.pw}</td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <ReturnChart marketNo={marketNo}/>
            </div>
        </div>
    )

}

export default MarketDetail;