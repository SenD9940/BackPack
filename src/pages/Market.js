import React, { useEffect, useState } from "react";
import "./Market.css";
import CompanyNav from "../components/CompanyNav";
import Header from "../components/Header";
import {readFireStore } from "../server/firebase";
import Profile from "../components/Profile";
import ReturnHistory from "../components/ReturnHistory";
import CheckAccountBalance from "../components/CheckAccountBalance";
function Market({user}){
    const uid = sessionStorage.getItem("uid");
    const [market, setMarket] = useState({
        market_name:''
    });
    useEffect(() =>{
        if(user !== null){
            const query = {var_name:"market_no", operator:"==", data:user}
            readFireStore("auth", query).then(res => {
                res.forEach(data => {
                    setMarket(data.data());
                })
            });
        }
    },[])
    const [navSelected, setNavSelected] = useState("전체내역");
    const navitems = [
            {
                name:"전체내역",
                onClick:() => {console.log("test1")}
            },
            {
                name:"승인내역",
                onClick:() => {}
            },
            {
                name:"잔액조회",
                onClick:() => {console.log("test2")}
            },
            {
                name:"프로필",
                onClick:() => {}
            }
        ]
    return(
        <div id="Market">
            <Header title={market.market_name} subTitle={"환불내역 관리 및 기타 관리를 하실 수 있습니다"}/>
            <CompanyNav navItems={navitems} navSelected={navSelected} setNavSelected={setNavSelected}/>
            {navSelected === "전체내역" || navSelected === "승인내역" ? <ReturnHistory user={user} nav={navSelected} /> : null}
            {navSelected === "잔액조회" ? <CheckAccountBalance user={user} /> : null}
            {navSelected === "프로필" ? <Profile uid={uid} /> : null}
        </div>
    );
}

export default Market;