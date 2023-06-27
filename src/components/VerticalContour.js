import React from "react";
import "../css/VerticalContour.css";

function VerticalContour({color}){
    return(
        <span id="VerticalContour" style={color ? {borderColor:color} : null}></span>
    )
}

export default VerticalContour;