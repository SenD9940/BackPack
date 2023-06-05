import React, { useState } from "react";
import "./FindAuthData.css";
import PhoneAuth from "../components/PhoneAuth";
import Header from "../components/Header";
import ButtonConfirm from "../components/ButtonConfrim";
import { readFireStore } from "../server/firebase";
import Modal from "../components/Modal";
import { decrypto } from "../functions/crypto";
import { useNavigate } from 'react-router-dom';
import TextInputForm from "../components/TextInputForm";

function FindAuthData({willFind}){
    const navigate = useNavigate();
    const [input, setInput] = useState({
        phone:'',
        auth_code:'',
        essentials:''
    });
    const [inputState, setInputState] = useState({
        phone:false,
        auth_code:false
    })
    const [phoneUid, setPhoneUid] = useState('')
    const [found, setfound] = useState('');
    const [modal, setModal] = useState(false);

    function onChange(e){
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]:value
        })
    }
    
    async function onFindButtonClick(){
        if(phoneUid.length && input.essentials.length){
            const query = {var_name:"phone_uid", operator:"==", data:phoneUid}
            const didFind = await readFireStore("auth", query).then(res => {
                res.forEach((data) => {
                    if(willFind==="비밀번호" && (data.data().email === input.essentials)){
                        const password = decrypto(data.data().password)
                        setfound(password);
                        setModal(true);
                        return true;
                    }else if(willFind==="아이디" && (data.data().market_name === input.essentials)){
                        setfound(data.data().email);
                        setModal(true);
                        return true;
                    }
                })
            })
            if(!didFind){
                setModal(true);
            }
        }else{
            alert("입력창을 확인해 주세요");
        }
    }

    function onSuccessConfirmClick(){
        navigate("/Login");
    }

    function onFailConfirmClick(){
        setModal(false);
    }

    return(
        <div id="FindAuthData">
            {modal && found? <Modal title={"SUCCESS"} subTitle={`${willFind}: ${found}`} onModalConfirm={onSuccessConfirmClick}/> : null}
            {modal && !found? <Modal title={`${willFind} NOT FOUND`} subTitle={`업체 이름을 다시 확인해 주세요`} onModalConfirm={onFailConfirmClick}/> : null}
            <div id="FindAuthDataWrap">
                <Header title={`${willFind}찾기`} subTitle={"전화번호를 통해 찾을 수 있습니다"} />
                <div id="FindAuthDataContents">
                    <TextInputForm id="InputEssentails" type="text" placeholder={willFind==="비밀번호" ? "이메일": "업체명"} name={"essentials"} value={input.essentials} onChange={onChange}/>
                    <PhoneAuth input={input} setInput={setInput} inputState={inputState} setInputState={setInputState} onChange={onChange} setPhoneUid={setPhoneUid}/>
                    <ButtonConfirm buttonName={`${willFind} 찾기`} onConfirmClick={onFindButtonClick}/>
                </div>
            </div >
        </div>
    )
}

export default FindAuthData;