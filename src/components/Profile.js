import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import { decrypto } from "../functions/crypto";
import { firebaseLogout, readFireStore } from "../server/firebase";
import ButtonConfirm from "./ButtonConfrim";
import { useNavigate } from "react-router-dom";
import ReturnChart from "./ReturnChart";
function Profile({uid}){
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        register_date:'',
        market_no:'',
        market_name:'',
        name:'',
        phone:'',
        email:'',
        password:'',
        is_admin:0
    });

    useEffect(() => {
        getUserInfo();
    }, [])

    function getUserInfo(){
        const query = {var_name:"uid", operator:"==", data:uid};
        readFireStore("auth", query).then(res => {
            res.forEach(data => {
                const u_data = data.data();
                const phone = decrypto(u_data.market_phone);
                const password = decrypto(u_data.password);
                setUserInfo({
                    register_date:u_data.register_date,
                    market_no:u_data.market_no,
                    market_name:u_data.market_name,
                    name:u_data.ceo,
                    phone:phone,
                    email:u_data.email,
                    password:password,
                    is_admin:u_data.is_admin
                });
            })
        })
    }


    function getDate(){
        const d = new Date(userInfo.register_date.toDate());
        const date = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        return date;
    }

    function onLogoutClick(){
        firebaseLogout().then(res => {
            if(res){
                alert("로그아웃 되었습니다");
                sessionStorage.removeItem("market_no");
                sessionStorage.removeItem("uid");
                navigate("/");
            }
        })
    }

    return(
        <div id="Profile">
            <button id="ButtonLogout" onClick={onLogoutClick}>로그아웃</button>
            <div id="ProfileWrap">
                <div id="ProfileTitle">프로필</div>
                <div id="ProfileUserInfo">
                   <table id="ProfileTable">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>업체명</th><td>{userInfo.market_name}</td>
                            </tr>
                            <tr>
                                <th>성명</th><td>{userInfo.name}</td>
                            </tr>
                            <tr>
                                <th>전화번호</th><td>{userInfo.phone}</td>
                            </tr>
                            <tr>
                                <th>이메일</th><td>{userInfo.email}</td>
                            </tr>
                            <tr>
                                <th>비밀번호</th><td>{userInfo.password}</td>
                            </tr>
                            <tr>
                                <th>가입일</th><td>{userInfo.register_date ? getDate() : null}</td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                   </table>
                   <ButtonConfirm buttonName={"프로필 수정"}/>
                </div>
                <ReturnChart marketNo={userInfo.market_no}/>
            </div>
        </div>
    )
}

export default Profile;