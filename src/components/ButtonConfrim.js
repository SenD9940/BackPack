import React from "react";
import "../css/ButtonConfirm.css";
function ButtonConfirm({buttonName, onConfirmClick}){
    return(
        <div id="ButtonConfirmWap">
            <button id="ButtonConfirm" onClick={onConfirmClick}>{buttonName}</button>
        </div>
    )
}

export default ButtonConfirm;