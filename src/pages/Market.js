import React, { useEffect, useState } from "react";
import "./Market.css";
import CompanyNav from "../components/CompanyNav";
import Header from "../components/Header";
import {readFireStore } from "../server/firebase";
import Profile from "../components/Profile";
import ReturnHistory from "../components/ReturnHistory";
import CheckAccountBalance from "../components/CheckAccountBalance";
import { useSelector } from "react-redux";
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
    const navitems = [
            {
                name:"환불내역",
                onClick:() => {}
            },
            {
                name:"잔액조회",
                onClick:() => {}
            },
            {
                name:"프로필",
                onClick:() => {}
            }
        ]
    const selectedMainNavItem = useSelector(state => state.selectedMainNavItem);
    return(
        <div id="Market">
            <Header title={market.market_name} subTitle={"환불내역 관리 및 기타 관리를 하실 수 있습니다"}/>
            <CompanyNav navName={"main"} navItems={navitems} navSelected={selectedMainNavItem}/>
            {selectedMainNavItem === "환불내역" ? <ReturnHistory user={user} /> : null}
            {selectedMainNavItem === "잔액조회" ? <CheckAccountBalance user={user} /> : null}
            {selectedMainNavItem === "프로필" ? <Profile uid={uid} /> : null}
        </div>
    );
}

export default Market;