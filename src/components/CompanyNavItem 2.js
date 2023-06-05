import React from "react";
import "../css/CompanyNavItem.css"
function CompanyNavItem({navItem, navSelected, setNavSelected}){
    let style = null;
    if(navItem.name === navSelected){
        style = {backgroundColor:"#363636"}
    }
    function onNavClick(){
        setNavSelected(navItem.name);
        navItem.onClick();
    }
    return(
        <div id="CompanyNavItem" style={style} onClick={onNavClick}>
            <div id="CompanyNavItemName">{navItem.name}</div>
        </div>
    )
}

export default CompanyNavItem;