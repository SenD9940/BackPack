import React, { useEffect, useState } from "react";
import { readFireStore } from "../server/firebase";
import "../css/CounterExampleDetail.css";
import ButtonConfirm from "./ButtonConfrim";

function CounterExampleDetail({selectedItem}){
    const [counterExample, setCounterExample] = useState({
        title:"",
        id:"",
        contents:[]
    });

    useEffect(() => {
        getCounterExample();
    }, [selectedItem])

    function getCounterExample(){
        const query = {var_name:"id", operator:"==", data:selectedItem};
        readFireStore("counter", query).then(res => {
            res.forEach(data => {
                setCounterExample(data.data());
            })
        })
    }

    function setImageAndDesc(){
        console.log(counterExample);
        let image_desc = [];
        for(let i = 0; i < counterExample.contents.length; i++){
            image_desc.push(<div id="CounterExampleDetailContents" key={i}><img src={counterExample.contents[i].img}/><div>{counterExample.contents[i].desc}</div></div>)
        }
        return image_desc;
    }

    return(
        <div id="CounterExampleDetail">
            <div id="CounterExampleDetailContentsWrap">
                <div id="CounterExampleDetailTitle">{counterExample.title}</div>
                {counterExample.contents.length ? setImageAndDesc() : null}
                <div id="CounterExampleDetailButtonWrap">
                    <ButtonConfirm buttonName={"반례 수정"}/>
                </div>
            </div>
        </div>
    )
}

export default CounterExampleDetail;