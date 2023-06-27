import React, { useState } from "react";
import "./Return.css";
import ReturnTimeLine from "../components/ReturnTimeLine";
import ReturnRejected from "../components/ReturnRejected";

function Return(){
    const [selectedNav, setSelectedNav] = useState("실시간 환불");
    const selectedNavStyle = {
        borderBottom:"2px solid blue",
        color:"blue",
        fontWeight:"bolder"
    }

    return(
        <div id="Return">
            <div id="ReturnNavigation">
                <div className="ReturnNavigationItem" style={selectedNav === "실시간 환불" ? selectedNavStyle :null}
                onClick={() => {setSelectedNav("실시간 환불")}}>실시간 환불</div>
                <div className="ReturnNavigationItem" style={selectedNav === "환불 불가 사례" ? selectedNavStyle : null} 
                onClick={() => setSelectedNav("환불 불가 사례")}>환불 불가 사례</div>
            </div>
            <div id="ReturnContents">
                {selectedNav === "실시간 환불" ? <ReturnTimeLine /> : null}
                {selectedNav === "환불 불가 사례" ? <ReturnRejected /> : null}
            </div>
        </div>
    )
}

export default Return;