import React from "react";
import "../css/ReturnDetailImg.css";
function ReturnDetailImg({imgName, img}){
    return(
        <div id="ReturnDetailImg">
            <div id="ReturnDetailImgName">{imgName}</div>
            <img src={img}></img>
        </div>
    )
}

export default ReturnDetailImg;