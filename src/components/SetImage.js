import React from "react";
import "../css/SetImage.css";
import baseimg from "../backpacklogo.png"
function SetImage({label, imageId}){
    return(
        <div className="SetImage" onClick={()=> {document.getElementById(imageId).click();}}>
            <img className="SetBaseImage" src={baseimg}></img>
            <div className="SetImageLabel">{label}</div>
        </div>
    )
}

export default SetImage;