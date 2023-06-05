import React, {useState} from "react";
import "./Register.css";
import Header from "../components/Header";
import TextInputForm from "../components/TextInputForm";
import { firebaseCreateAccount, writeFireStore } from "../server/firebase";
import { encrypto } from "../functions/crypto";
import ButtonConfirm from "../components/ButtonConfrim";
import PhoneAuth from "../components/PhoneAuth";
import { useNavigate } from 'react-router-dom';
import { businessValidationCheck, firestoreDataDuplicatedValidationCheck, lengthValidationCheck } from "../functions/ValidationCheck";
function Register(){
    const navigate = useNavigate();
    const [input, setInput] = useState({
        b_no:'',
        b_name:'',
        name:'',
        phone:'',
        auth_code:'',
        email:'',
        password:'',
        password_re:''
    });

    const [inputState, setInputState] = useState({
        b_no:false,
        b_name:false,
        name:false,
        phone:false,
        auth_code:false,
        email:false,
        password:false,
        password_re:false,
    });

    const [phoneUid, setPhoneUid] = useState();
    
    async function onChange(e){
        const {name, value} = e.target;
        var data = value.trim();
        setInput({
            ...input,
            [name]:data
        })
        const state = await validationCheck(name, data);
        setInputState({
            ...inputState,
            [name]:state
        });
    }

    async function validationCheck(name, value){
        let state = false;
        if(name === "phone"){
            return;
        }else if(name === "b_name"){
            if(value === "ADMIN"){
                state = true;
            }else{
                state = await firestoreDataDuplicatedValidationCheck(value, "auth", "market_name");
            }
        }else if(name === "name"){
            state = lengthValidationCheck(value, 0);
        }else if(name === "password"){
            state = lengthValidationCheck(value, 7);
        }else if(name === "password_re"){
            if(value === input.password){
                state = true;
            }
        }else if(name === "b_no"){
            if(value === "0101010101"){
                state = true;
            }
            else if(value.length === 10){
                const res = await businessValidationCheck(value);
                if(res){
                    state = await firestoreDataDuplicatedValidationCheck(value, "auth", "market_no");
                }
            }else{
                state = "length";
            }
        }else if(name === "email"){
            if(value.includes("@")){
                state = await firestoreDataDuplicatedValidationCheck(value, "auth", "email");
            }
        }
        return state;
    }
   
    async function RegisterButtonClick(){
        if(stateValidationCheck()){
            const register_data = getRegisterData();
            const firebaseRegisterState = await firebaseCreateAccount(input.email, input.password).then(user => {
                if(user.uid){
                    register_data.uid = user.uid
                    return true;
                }else{
                    return false;
                }
            })
            if(firebaseRegisterState){
                const res_id = await register(register_data);
                if(res_id){
                    alert("회원가입에 성공했습니다");
                    navigate("/Login");
                }
            }
        }else{
            alert("입력창을 다시 확인 해주세요");
        }
    }

    function getRegisterData(){
        const password = encrypto(input.password);
        const phone = encrypto(input.phone);
        const d = new Date();
        let register_data = {
            register_date:d,
            market_no:input.b_no,
            market_name:input.b_name,
            ceo:input.name,
            market_phone:phone,
            email:input.email,
            password:password,
            phone_uid:phoneUid,
            is_admin:0
        };
        if(register_data.b_name === "ADMIN" && register_data.b_no === "0101010101"){
            register_data.is_admin = 1;
        }
        return register_data;
    }

    function stateValidationCheck(){
        const keys = Object.keys(input);
        for(var i = 0; i < keys.length; i++){
            const key = keys[i];
            if(inputState[key] !== true){
                return false;
            }
        }
        return true;
    }

    async function register(register_data){
        const res_id = await writeFireStore('auth', register_data).then(res => {
            if(register_data.is_admin){
                return res.id;
            }else{
                return registerMarket(register_data);
            }
        }).catch(err => {
            console.log(err);
        });
        return res_id;
    }

    async function registerMarket(register_data){
        const res_id = await writeFireStore('market', {
            market_no:register_data.b_no,
            market_name:register_data.b_name,
            account_balance:0
        }).then(res => {
            return res.id;
        }).catch(err => {
            console.log(err);
        })
        return res_id;
    }

    return(
        <div id="Register">
            <Header title={"회원가입"} subTitle={"해당 형식에 맞게 작성해 주세요"}/>
            <div id="RegisterContentsWrap">
                <div id="RegisterContentsMain">
                    <div id="RegisterContents">
                        <TextInputForm name={"b_name"} value={input.b_name} placeholder={"업체명"} type={"text"} state={inputState.b_name} onChange={onChange} comment={"업체명은 2글자 이상입니다"}/>
                        <TextInputForm name={"name"} value={input.name} placeholder={"이름"} type={"text"} state={inputState.name} onChange={onChange}/>
                        <TextInputForm name={"b_no"} value={input.b_no} placeholder={"사업자번호( - 없이)"} type={"text"} state={inputState.b_no} onChange={onChange} comment={"국세청에 등록되지 않은 사업자 입니다"}/>
                        <PhoneAuth onChange={onChange} input={input} inputState={inputState} setInput={setInput} setInputState={setInputState} setPhoneUid={setPhoneUid}/>
                        <TextInputForm name={"email"} value={input.email} placeholder={"이메일"} type={"text"} state={inputState.email} onChange={onChange}/>
                        <TextInputForm name={"password"} value={input.password} placeholder={"비밀번호"} type={"password"} state={inputState.password} onChange={onChange} comment={"비밀번호는 8자리 이상입니다"}/>
                        <TextInputForm name={"password_re"} value={input.password_re} placeholder={"비밀번호 재입력"} type={"password"} state={inputState.password_re} onChange={onChange} comment={"비밀번호가 일치하지 않습니다"}/>
                    </div>
                    <div>
                        <ButtonConfirm onConfirmClick={RegisterButtonClick} buttonName={"회원가입"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;