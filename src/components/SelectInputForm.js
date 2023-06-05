import React from "react";
import "../css/SelectInputForm.css";

function SelectInputForm({name, value, onChange, options}){
    return(
        <div className="SelectInputForm">
            <select className="SelectInput" name={name} value={value} onChange={onChange}>{options}</select>
        </div>
    )
}

export default SelectInputForm;