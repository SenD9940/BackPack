import React from "react";
import "../css/Navigation.css";
import { Link } from "react-router-dom";
import VerticalContour from "./VerticalContour";
function Navigation(){
    const user = sessionStorage.getItem("market_no");
    return(
        <div id="Navigation">
            <Link id="NavigationButtonCustomer" className="NavigationButton" to="Customer">환불하기</Link>
            <VerticalContour />
            <Link id="NavigationButtonCustomer" className="NavigationButton" to="Return">환불내역</Link>
            <VerticalContour />
            <Link className="NavigationButton" to={user ? "Company" : "Login"}>판매자</Link>
        </div>
    );
}

export default Navigation;