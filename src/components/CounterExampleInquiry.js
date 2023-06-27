import React, { useEffect, useState } from "react";
import { readFireStore } from "../server/firebase";
import ListView from "./ListView";
import ListItem from "./ListItem";
import CounterExampleDetail from "./CounterExampleDetail";
import "../css/CounterExampleInquiry.css";

function CounterExampleInquiry(){
    const [selectedItem, setSelectedItem] = useState("");
    const [counterExampleList, setCounterExampleList] = useState([]);

    useEffect(() => {
        getCounterExampleList();
    }, [])

    function getCounterExampleList(){
        readFireStore("counter").then(res => {
            res.forEach((data)=> {
                setCounterExampleList(counter => [...counter, data.data()]);
            })
        })
    }

    function setCounterListViewItems(){
        let counterList = [];
        for(let i = 0; i < counterExampleList.length; i++){
            counterList.push(<ListItem key={i} title={counterExampleList[i].title} value={counterExampleList[i].id} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>)
        }
        return counterList;
    }

    useEffect(() => {
        if(counterExampleList.length){
            setSelectedItem(counterExampleList[0].id);
        }
    }, [counterExampleList])

    console.log(counterExampleList);

    return(
        <div id="CounterExampleInquiry">
            {counterExampleList.length ?<ListView listTitle={"반례 목록"}>
                {setCounterListViewItems()}
            </ListView> : null}
            {selectedItem ? <CounterExampleDetail selectedItem={selectedItem}/> : null}
        </div>
    )
}

export default CounterExampleInquiry;