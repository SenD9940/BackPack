import React, { useEffect, useState } from "react";
import { authGetPhoneCode, authSendPhoneCode} from "../server/firebase";
import Loading from "./Loading";
import "../css/PhoneAuth.css";

function PhoneAuth({input,  setInput, inputState, setInputState, onChange, setPhoneUid}){
    const [customerPhoneButtonClicked, setCustomerPhoneButtonClicked] = useState(false);
    const [customerPhoneButtonSendClicked, setCustomerPhoneButtonSendClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    function CustomerPhoneGetAuthClick(e){
        authGetPhoneCode(input.phone, e.target.id);
        setCustomerPhoneButtonClicked(true);
    }

    async function CustomerPhoneSendAuthClick(){
        const auth_code = input.auth_code;
        if(auth_code.length === 6){
            setLoading(true);
            setCustomerPhoneButtonSendClicked(true);
            await authSendPhoneCode(auth_code).then(user => {
                if(user !== null){
                    setInputState({
                        ...inputState,
                        auth_code:true
                    })
                    setPhoneUid(user.uid);
                }
            });
        }setLoading(false);
        
    }
    useEffect(()=>{
        setInput({
            ...input,
            phone:input.phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
        });
        if(input.phone.length === 13){
            setInputState({
                ...inputState,
                phone:true
            })
        }else{
            setCustomerPhoneButtonClicked(false);
            setCustomerPhoneButtonSendClicked(false);
            setCustomerPhoneButtonSendClicked(false);
            setInputState({
                ...inputState,
                phone:false
            })
        }
    },[input.phone])
    function onClick(){
        if(!input.phone.length){
            setInput({...input, phone:"010"});
        }
        console.log(input.phone.length);
    }
    return(
        <div id="PhoneAuth">
            {loading ? <Loading loadingLabel={"정보 확인중"}/> : null}
            <div className="PhoneInputWrap">
                <input className="PhoneInput" name={"phone"} placeholder={"휴대폰"} value={input.phone} onChange={onChange} onClick={onClick} maxLength={"13"} style={inputState.phone && inputState.auth_code === false? {textAlign:"right"}:{textAlign:"center"}} disabled={inputState.auth_code ? true : false}/>
                    {inputState.phone && inputState.auth_code === false? <button id="CustomerPhoneGetAuthClick" className="PhoneButtonAuth" onClick={CustomerPhoneGetAuthClick}>인증 하기</button> : null}
            </div>
            {customerPhoneButtonClicked && inputState.auth_code === false? (<div id="CustomerPhoneInputCode">
                <div className="PhoneInputWrap">
                    <input className="PhoneInput" name={"auth_code"} placeholder={"인증번호"} value={input.auth_code} onChange={onChange} style={{borderTop:"none"}} maxLength={"6"}/>
                    <button className="PhoneButtonAuth" onClick={CustomerPhoneSendAuthClick} style={{borderTop:"none"}}>코드 전송</button>
                </div>
            </div>) : null}
            {customerPhoneButtonClicked && input.auth_code && customerPhoneButtonSendClicked? <div className="TextInputLabel" style={inputState.auth_code?{color:"green"}:{color:"red"}}>{inputState.auth_code? "확인되었습니다" : "인증코드가 일치하지 않습니다"}</div> : null}
        </div>
    )
}

export default PhoneAuth;