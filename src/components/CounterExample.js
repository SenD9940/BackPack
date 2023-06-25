import React, { useEffect, useState } from "react";
import ListView from "./ListView";
import CompanyNav from "./CompanyNav";
import RegisterCounterExample from "./RegisterCounterExample";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSubNavItem } from "../redux/action";


function CounterExample(){
    const [counterList, setCounterList] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const selectedSubNavItem = useSelector(state => state.selectedSubNavItem);
    const dispatch = useDispatch();
    useEffect(() => {
        if(selectedSubNavItem === "등록"){
           
        }else{
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
            {counterList.length !== 0 ?<ListView listTitle={"마켓 목록"}>
                {/* 여기에 리스트 추가 */}
            </ListView> : null}
            {selectedSubNavItem === "등록" ? <RegisterCounterExample /> : null}
            <div id="CounterRegisterContents">
                
            </div>
        </div>
    )
}

export default CounterExample;