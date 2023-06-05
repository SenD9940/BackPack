import React from 'react';
import "../css/Header.css";
function Header({title, subTitle}){
    return(
        <div id="Header">
            <div id="HeaderTitle">{title}</div>
            <div id="HeaderSubTitle">{subTitle}</div>
        </div>
    )
}

export default Header;