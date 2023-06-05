import React from "react";
import "../css/ListItem.css";

function ListItem({title, contents, value, selectedItem, setSelectedItem}){
    let style = null;
    if(selectedItem === value){
        style = {backgroundColor:"#363636"}
    }
    function onListItemClick(){
        setSelectedItem(value);
    }
    return (
        <div id="ListItem" style={style} onClick={onListItemClick}>
            <div>{title}</div>
            <div>{contents}</div>
        </div>
    );

}

export default ListItem;