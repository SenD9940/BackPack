import React, { useEffect, useState } from "react";
import "./Admin.css";
import CompanyNav from "../components/CompanyNav";
import Header from "../components/Header";
import { readFireStore } from "../server/firebase";
import ReturnHistory from "../components/ReturnHistory";
import ManageMarket from "../components/ManageMarket";
import Profile from "../components/Profile";
import CounterExample from "../components/CounterExample";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMainNavItem } from "../redux/action";

function Admin(){
    const uid = sessionStorage.getItem("uid");
    const [user, setUser] = useState({
        user_name:'',
        user_no:''
    })
    useEffect(() =>{
        getUser();
    },[])

    function getUser(){
        console.log(uid);
        const query = {var_name:"uid", operator:"==", data:uid};
        readFireStore("auth", query).then(res => {
            res.forEach(data => {
                setUser({
                    user_name:data.data().ceo,
                    user_no:data.data().market_no
                })
            });
        })
    }
    const navItems = [
        {
            name:"환불내역",
            onClick:() => {}
        },
        {
            name:"반례관리",
            onClick:() => {}
        },
        {
            name:"마켓관리",
            onClick:() => {}
        },
        {
            name:"프로필",
            onClick:() => {}
        }
    ]

    const selectedMainNavItem = useSelector(state => state.selectedMainNavItem);
    return(
        <div id="Admin">
            <Header title={`${user.user_name} 운영자님`} subTitle={"환영합니다"}/>
            <CompanyNav navName={"main"} navItems={navItems} navSelected={selectedMainNavItem}/>
            {selectedMainNavItem === "환불내역" ? <ReturnHistory user={user.user_no}/> : null}
            {selectedMainNavItem === "반례관리" ? <CounterExample /> : null}
            {selectedMainNavItem === "마켓관리" ? <ManageMarket /> : null}
            {selectedMainNavItem === "프로필" ? <Profile uid={uid} /> : null}
        </div>
    );
}

export default Admin;