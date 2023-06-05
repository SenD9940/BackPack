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

    const [navSelected, setNavSelected] = useState("전체내역");
    const navitems = [
            {
                name:"전체내역",
                onClick:() => {}
            },
            {
                name:"미승인내역",
                onClick:() => {}
            },
            {
                name:"승인내역",
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
    return(
        <div id="Admin">
            <Header title={`${user.user_name} 운영자님`} subTitle={"환영합니다"}/>
            <CompanyNav navItems={navitems} navSelected={navSelected} setNavSelected={setNavSelected}/>
            {navSelected === "전체내역" || navSelected === "승인내역" || navSelected === "미승인내역"? <ReturnHistory user={user.user_no} nav={navSelected}/> : null}
            {navSelected === "마켓관리" ? <ManageMarket /> : null}
            {navSelected === "프로필" ? <Profile uid={uid} /> : null}
        </div>
    );
}

export default Admin;