import React from "react";
import "../css/PaymentHistoryListItem.css";
function PaymentHistoryListItem({name, price}){
    return(
        <div id="PaymentHistoryListItem">
            <div id="PaymentHistoryListItemCustomerName">
                {name}
            </div>
            <div id="PaymentHistoryListItemPrice">
                {`- 물품가액(${price}) + 택배비(${3000})`}
            </div>
        </div>
    )
}

export default PaymentHistoryListItem;