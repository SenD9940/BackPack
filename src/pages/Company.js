import React from "react";
import "./Company.css";
import Market from "./Market";
import Admin from "./Admin";

//마켓페이지, 어드민 페이지 컨트롤러
function Company(){
    const user = sessionStorage.getItem("market_no");
    return(
        <div id="Company">
            {user && user !== "0101010101"? <Market user={user}/> : null}
            {user === "0101010101"? <Admin /> : null}
        </div>
    );
}

export default Company;