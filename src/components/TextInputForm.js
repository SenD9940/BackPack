import React from "react";
import "../css/TextInputForm.css";

function TextInputForm({name, value, placeholder, type, state, comment, onChange}){
    let formStyle = {color:"red"};
    let labelText = null;
    if(state === true){
        formStyle = {color:"green"};
        labelText = "사용가능합니다";
    }else if(state === 'duplicated'){
        labelText = "이미 사용되었습니다";
    }else if(state === 'length'){
        labelText = "사업자 번호는 10자리 입니다";
    }else{
        labelText = "정확한 형식으로 입력해 주세요";
        if(comment){
            labelText = comment;
        }
    }
    return(
        <div className="TextInputForm" >
            <input type={type} className="TextInput" placeholder={placeholder} onChange={onChange} name={name} value={value} maxLength={name==="b_no"?10:null}></input>
            {value?<div className="TextInputLabel" style={formStyle}>{labelText}</div>:null}
        </div>
    )
}

export default TextInputForm;