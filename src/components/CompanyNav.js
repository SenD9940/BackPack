import React from "react";
import CompanyNavItem from "./CompanyNavItem";
import "../css/CompanyNav.css";
function CompanyNav({navName, navItems, navSelected, setNavSelected}){
    function getNavs(){
        let navs = [];
        for(let i = 0; i < navItems.length; i++){
            navs.push(<CompanyNavItem navName={navName} key={i + 1} navItem={navItems[i]} navSelected={navSelected} setNavSelected={setNavSelected}/>);
        }
        return navs;
    }
    return(
        <div id="CompanyNavList" style={navName === "sub" ? {backgroundColor:"#363636"} : null}>
            {getNavs()}
        </div>
    )
}

export default CompanyNav;