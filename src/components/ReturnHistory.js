import React, { useEffect, useState } from "react";
import "../css/ReturnHistory.css";
import ListView from "./ListView";
import { readFireStore } from "../server/firebase";
import ReturnDetail from "./ReturnDetail";
import ListItem from "./ListItem";

function ReturnHistory({user, nav}){
    const [history, setHistory] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    useEffect(()=>{
        setHistory([]);
        getHistoy();
    }, [user, nav]);

    useEffect(() =>{// 내림차순
        if(history.length !== 0){
            sortDate(history);
            setSelectedItem(history[0].return_id);
        }
    }, [history]);

    function sortDate(list) {
        const sorted_list = list.sort(function(a, b) {
            return new Date(a.application_date.toDate()).getTime() - new Date(b.application_date.toDate()).getTime();
        }).reverse();
        return sorted_list;
    }

    async function getHistoy(){
        if(user === "0101010101"){
            await readFireStore("return").then(res => {
                res.forEach(data => {
                    setHistoryList(data);
                })
            });
        }else{
            const query = {var_name:"market_no", operator:"==", data:user};
            await readFireStore("return", query).then(res => {
                res.forEach(data => {
                    setHistoryList(data);
                })
            });
        }
    }

    function setHistoryList(data){
        if(nav === "승인" && data.data().return_state === "true"){
            setHistory((history) => [...history, data.data()]);
        }else if(nav === "미승인" && data.data().return_state === "false"){
            setHistory((history) => [...history, data.data()]);
        }else if(nav === "거절" && data.data().return_state === "refused"){
            setHistory((history) => [...history, data.data()]);
        }else if(nav === "전체"){
            setHistory((history) => [...history, data.data()]);
        }
    }

    function setItemList(){
        const list = history.map((data, index) => {
            return <ListItem key={index} value={data.return_id} selectedItem={selectedItem} setSelectedItem={setSelectedItem} title={data.customer_name} contents={data.return_id}/>
        })
        return list;
    }
    return(
        <div id="ReturnHistory">
            {history.length !== 0 ? <ListView listTitle={"신청 목록"} >
                {setItemList()}
            </ListView> : null}
            <div id="ReturnHistoryContent">
            {history.length !== 0 ?<ReturnDetail returnId={selectedItem} user={user}/> : `${nav} 데이터가 없습니다`}
            </div>
        </div>
    )
}

export default ReturnHistory;