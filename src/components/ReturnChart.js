import React, { useCallback, useEffect, useState } from "react";
import { BarChart, LineChart, Bar, XAxis, YAxis, Legend, Line } from "recharts";
import "../css/ReturnChart.css";
import { readFireStore } from "../server/firebase";

function ReturnChart({marketNo}){
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        initChartData();
    },[marketNo])
    function initChartData(){
        const inital_data = [];
        const now_month = new Date().getMonth() + 1;
        for(let i = 0; i < 5; i ++){
            let month = now_month - i;
            if(month <= 0){
                month = 12 - month;
            }
            const data = {
                name:month+'월',
                month:month,
                quantity:0
            }
            inital_data.push(data);
        }
        inital_data.reverse();
        getReturn(inital_data);
    }
    function getReturn(inital_data){
        let query = {var_name:"market_no", operator:"==", data:marketNo};
        if(marketNo === "0101010101"){
            query = null;
        }
        if(marketNo){
            readFireStore("return", query).then(res =>{
                if(res.docChanges().length){
                    res.forEach(data => {
                        const month = new Date(data.data().application_date.toDate()).getMonth() + 1;
                        let findIndex = inital_data.findIndex(item => item.month === month);
                        inital_data[findIndex].quantity += 1;
                        setChartData(inital_data);
                    });
                }else{
                    for(let i = 0; i < inital_data.length; i++){
                        inital_data[0].quantity = 0;
                    }
                    setChartData(inital_data);
                }
            })
        }
    }
    console.log(chartData);
    return(
        <div id="ReturnChart">
            <div id="ReturnChartLabel">5개월간 환불 수량</div>
            <LineChart width={400} height={500} data={chartData} style={{display:"flex", flexGrow:"1", width:"100%"}} title="월별 한불 수량">
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }}/>
                <Line dataKey="quantity" fill="#8884d8" name="수량"/>
                <XAxis dataKey="name"/>
                <YAxis dataKey="quantity"/>
            </LineChart>
        </div>
    );
}

export default ReturnChart;