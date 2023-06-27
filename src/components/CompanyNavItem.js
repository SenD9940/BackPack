import React from "react";
import "../css/CompanyNavItem.css"
import { useDispatch } from "react-redux";
import { setSelectedMainNavItem, setSelectedSubNavItem } from "../redux/action";
function CompanyNavItem({navName, navItem, navSelected}){
    const dispatch = useDispatch();
    let style = null;
    if(navItem.name === navSelected){
        style = {backgroundColor:"#363636"}
    }

    if(navItem.name === navSelected && navName === "sub"){
        style = {color:"black"}
    }

    function onNavClick(){
        if(navName === "main"){
            dispatch(setSelectedMainNavItem(navItem.name));
        }else if(navName === "sub"){
            dispatch(setSelectedSubNavItem(navItem.name));
        }
        navItem.onClick();
    }
    return(
        <div id="CompanyNavItem" style={style} onClick={onNavClick}>
            <div id="CompanyNavItemName">{navItem.name}</div>
        </div>
    )
}

export default CompanyNavItem;