import React from "react";
import "../css/ButtonCancel.css";

function ButtonCancel({buttonName, onCancelClick}){
    return(
        <div id="ButtonCancelWrap">
            <button id="ButtonCancel" onClick={onCancelClick}>{buttonName}</button>
        </div>
    )
}

export default ButtonCancel;