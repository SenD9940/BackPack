import React, { useEffect, useState } from "react";
import "./Admin.css";
import CompanyNav from "../components/CompanyNav";
import Header from "../components/Header";
import { readFireStore } from "../server/firebase";
import ReturnHistory from "../components/ReturnHistory";
import ManageMarket from "../components/ManageMarket";
import Profile from "../components/Profile";

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

    const [navSelected, setNavSelected] = useState("환불내역");
    const [subNavSelected, setSubNavSelected] = useState("전체내역");
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

    const subNavItems = [
        {
            name:"전체",
            onClick:() => {}
        },
        {
            name:"미승인",
            onClick:() => {}
        },
        {
            name:"승인",
            onClick:() => {}
        },
        {
            name:"거절",
            onClick:() => {}
        },
    ]
    return(
        <div id="Admin">
            <Header title={`${user.user_name} 운영자님`} subTitle={"환영합니다"}/>
            <CompanyNav navName={"main"} navItems={navItems} navSelected={navSelected} setNavSelected={setNavSelected}/>
            {navSelected === "환불내역" ? <CompanyNav navName={"sub"} navItems={subNavItems} navSelected={subNavSelected} setNavSelected={setSubNavSelected}/> : null}
            {navSelected !== "마켓관리" && navSelected !== "프로필"? <ReturnHistory user={user.user_no} nav={subNavSelected}/> : null}
            {navSelected === "마켓관리" ? <ManageMarket /> : null}
            {navSelected === "프로필" ? <Profile uid={uid} /> : null}
        </div>
    );
}

export default Admin;