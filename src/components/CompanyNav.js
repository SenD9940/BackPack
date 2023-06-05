import React, { useState } from "react";
import CompanyNavItem from "./CompanyNavItem";
import "../css/CompanyNav.css";
function CompanyNav({navItems, navSelected, setNavSelected}){
    function getNavs(){
        let navs = [];
        for(let i = 0; i < navItems.length; i++){
            navs.push(<CompanyNavItem key={i + 1} navItem={navItems[i]} navSelected={navSelected} setNavSelected={setNavSelected}/>);
        }
        return navs;
    }
    return(
        <div id="CompanyNavList">
            {getNavs()}
        </div>
    )
}

export default CompanyNav;