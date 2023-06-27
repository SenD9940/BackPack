import React, { useEffect, useState } from "react";
import ListView from "./ListView";
import CompanyNav from "./CompanyNav";
import RegisterCounterExample from "./RegisterCounterExample";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSubNavItem } from "../redux/action";
import CounterExampleInquiry from "./CounterExampleInquiry";


function CounterExample(){
    const [selectedItem, setSelectedItem] = useState('');
    const selectedSubNavItem = useSelector(state => state.selectedSubNavItem);
    const dispatch = useDispatch();
    useEffect(() => {
        if(selectedSubNavItem !== "등록"){
            dispatch(setSelectedSubNavItem("조회"));
        }
    }, [])

    const subNavItems = [
        {
            name:"조회",
            onClick:() => {}
        },
        {
            name:"등록",
            onClick:() => {}
        }
    ]

    return(
        <div id="CounterExample">
            <CompanyNav navName={"sub"} navItems={subNavItems} navSelected={selectedSubNavItem}/>
            {selectedSubNavItem === "조회" ? <CounterExampleInquiry /> : null}
            {selectedSubNavItem === "등록" ? <RegisterCounterExample /> : null}
            <div id="CounterRegisterContents">
                
            </div>
        </div>
    )
}

export default CounterExample;