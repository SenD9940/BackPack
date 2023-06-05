import React, { useState } from "react";
import "./Company.css";
import Login from "../components/Login";
import Market from "./Market";
import Admin from "./Admin";

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