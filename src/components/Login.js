import React, { useEffect, useState } from "react";
import "../css/Login.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { firebaseLogin, readFireStore } from "../server/firebase";
import Modal from "./Modal";
import ButtonConfirm from "./ButtonConfrim";
import { decrypto } from "../functions/crypto";
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email:'',
        pw:'',
    })
    const [loginState, setLoginState] = useState(null);
    
    function onChange(e){
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]:value
        });
    }

    function siginIn(){
        firebaseLogin(input.email, input.pw).then(user => {
            if(user){
                if(getUser(user.uid)){
                    navigate("/Company");
                    setLoginState(true);
                    return;
                }
            }
            setLoginState(false);
        });
    }

    async function getUser(uid){
        const query = {var_name:"uid", operator:"==", data:uid};
        const result = await readFireStore("auth", query).then(res => {
            res.forEach(data => {
                sessionStorage.setItem("market_no", data.data().market_no);
                sessionStorage.setItem("uid", data.data().uid);
                return true;
            })
        })
        return result;
    }

    function onModalConfirm(){
        setInput({
            ...input,
            id:'',
            pw:''
        })
        setLoginState(null);
    }
    function onModalCancel(){
        setLoginState(null);
    }
    return(
        <div id="Login">
            {loginState === false ? <Modal show={loginState} title={"로그인 실패"} subTitle={"아이디나 비밀번호가 틀립니다"} onModalConfirm={onModalConfirm} onModalCancel={onModalCancel}/>: null}
            <div id="LoginLayout">
                <Header title={"로그인"} subTitle={"로그인을 하셔야 이용할 수 있습니다"}/>
                <div id="LoginContentsWrap">
                    <div id="LoginContents">
                        <div id="LoginContentsMain">
                            <div id="LoginInputWrap">
                                <input type="email" className="LoginInput" id="LoginInputEmail" placeholder="이메일" name="email" value={input.email} onChange={onChange}/>
                                <input type="password" className="LoginInput" id="LoginInputPw" placeholder="비밀번호" name="pw" value={input.pw} onChange={onChange} onKeyUp={(e) => {
                                    if(e.key === "Enter"){
                                        siginIn();
                                    }
                                }}/>
                            </div>
                            <div id="LoginButtonWrap">
                                <ButtonConfirm buttonName={"로그인"} onConfirmClick={siginIn}/>
                            </div>
                        </div>
                        <div id="LoginUtility">
                            <div id="LoginFindOptions">
                                <Link className="LoginUtilityButton" to={"FindID"}>아이디 찾기</Link>
                                <Link className="LoginUtilityButton" to={"FindPW"}>비밀번호 찾기</Link>
                            </div>
                            <div>
                                <Link className="LoginUtilityButton" to={"Register"}>회원가입</Link>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default Login;