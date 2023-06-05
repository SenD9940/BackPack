import React from "react";
import "../css/Navigation.css";
import { Link } from "react-router-dom";
function Navigation(){
    const user = sessionStorage.getItem("market_no");
    return(
        <div id="Navigation">
            <Link id="NavigationButtonCustomer" className="NavigationButton" to="Customer">환불하기</Link>
            <Link className="NavigationButton" to={user ? "Company" : "Login"}>판매자</Link>
        </div>
    );
}

export default Navigation;