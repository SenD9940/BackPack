import React from "react";
import "../css/ListView.css";
function ListView({listTitle, children}){
    return(
        <div id="ListView">
            <div id="ListViewTitle">{listTitle}</div>
            <div id="ListViewLists">
                {children}
            </div>
        </div>
    )
}

export default ListView;