import React, { useEffect, useState } from "react";
import "../css/ReturnDetail.css";
import { readFireStore, updateFireStore, writeFireStore } from "../server/firebase";
import { decrypto } from "../functions/crypto";
import ReturnDetailImg from "./ReturnDetailImg";
import ButtonConfirm from "./ButtonConfrim";
import Loading from "./Loading";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setCounterTempData, setSelectedMainNavItem, setSelectedSubNavItem } from "../redux/action";

function ReturnDetail({returnId, user}){
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(false);
    const [modal, setModal] = useState(false);
    const counterTempData = useSelector(state => state.counterTempData);
    const dispatch = useDispatch();
    const [returnData, setReturnData] = useState({
        application_date:'',
        return_id:'',
        customer_name:'',
        customer_phone:'',
        customer_address:'',
        address_detail:'',
        market_no:'',
        market_name:'',
        category:'',
        image_front:'',
        image_left:'',
        image_right:'',
        image_back:'',
        image_inside:'',
        document_id:'',
        return_state:false
    });

    useEffect(() =>{
        getReturnDetail();
    }, [returnId, modal])

    async function getReturnDetail(){
        const query = {var_name:"return_id", operator:"==", data:returnId};
        const market_no = await readFireStore("return", query).then(res => {
            const market = res.forEach(data => {
                getMarket(data)
            })
        });
    }

    function getMarket(m_data){
        const r_data_document_id = m_data.id;
        const r_data = m_data.data();
        const phone = decrypto(r_data.customer_phone);
        const address = decrypto(r_data.customer_address);
        const address_detail = decrypto(r_data.address_detail);
        const query = {var_name:"market_no", operator:"==", data:r_data.market_no};
        readFireStore("market", query).then(res => {
            res.forEach(data => {
                setReturnData({
                    ...returnData,
                    application_date:r_data.application_date,
                    return_id:r_data.return_id,
                    customer_name:r_data.customer_name,
                    customer_phone:phone,
                    customer_address:address,
                    address_detail:address_detail,
                    market_no:r_data.market_no,
                    category:r_data.category,
                    image_front:r_data.image_front,
                    image_left:r_data.image_left,
                    image_right:r_data.image_right,
                    image_back:r_data.image_back,
                    image_inside:r_data.image_inside,
                    document_id:r_data_document_id,
                    return_state:r_data.return_state,
                    market_name:data.data().market_name
                });
            })
        })
    }


    function getDate(){
        const d = new Date(returnData.application_date.toDate());
        const date = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        return date;
    }

    async function returnApproveClick(op){
        setLoading(true);
        const query = {var_name:"market_no", operator:"==", data:returnData.market_no};
        await readFireStore("market", query).then(res => {
            res.forEach(data => {
                updateMarketAccountBalance(data.id, data.data().account_balance, op);
            })
        });
    }

    async function updateMarketAccountBalance(document_id, account_balance, op){
        if(document_id){
            let data = {};
            if(op === "approve"){
                data = {
                    account_balance:account_balance - 3000
                }
            }else if(op === "cancel"){
                data = {
                    account_balance:account_balance + 3000
                }
            }
            updateFireStore("market", document_id, data).then(res => {
                if(res){
                    upDateReturnState(op);
                }
            })
        }
    }
    

    async function upDateReturnState(op){
        console.log(returnData.document_id);
        let data = {};
        if(op === "approve"){
            data = {
                return_state:"true"
            }
        }else if(op === "cancel"){
            data = {
                return_state:"false"
            }
        }else{
            data = {
                return_state:"refused"
            }
        }
        updateFireStore("return", returnData.document_id, data).then(res => {
            console.log(res);
            if(res){
                setLoading(false);
                setModal(true);
            }
        })
    }

    function onModalConfirmClick(){
        dispatch(setCounterTempData([{
            img:returnData.image_front,
            desc:"",
        },
        {
            img:returnData.image_back,
            desc:"",
        },
        {
            img:returnData.image_left,
            desc:"",
        },
        {
            img:returnData.image_right,
            desc:"",
        },
        {
            img:returnData.image_inside,
            desc:"",
        }]));
        dispatch(setSelectedMainNavItem("반례관리"));
        dispatch(setSelectedSubNavItem("등록"));
    }

    console.log(counterTempData);

    return(
        <div id="ReturnDetail">
            {counter ? <Modal title={"반례등록"} subTitle={"확인을 누르면 반례등록 페이지로 이등합니다"} onModalConfirm={onModalConfirmClick} onModalCancel={() => setCounter(false)}/> : null}
            {loading ? <Loading loadingLabel={"처리중입니다..."}/> : null }
            {modal ? <Modal title="처리되었습니다" onModalConfirm={()=>{setModal(false)}}/> : null }
            <div id="ReturnDetailCustomerInfo">
                <table id="ReturnDetailTable">
                <thead><tr><td colSpan={"2"}>고객 정보</td></tr></thead>
                <tbody>
                    <tr>
                        <th>이름</th><td>{returnData.customer_name}</td>
                    </tr>
                    <tr>
                        <th>주소</th><td>{`${returnData.customer_address} ${returnData.address_detail}`}</td>
                    </tr>
                    <tr>
                        <th>연락처</th><td>{returnData.customer_phone}</td>
                    </tr>
                    <tr>
                        <th>신청일</th><td>{returnData.application_date ? getDate() : null}</td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            <hr></hr>
            <div id="ReturnDetailContents">
                <div id="ReturnDetailContentsTitle">환불 정보</div>
                <ReturnDetailImg imgName={"전면"} img={returnData.image_front}/>
                <ReturnDetailImg imgName={"후면"} img={returnData.image_back}/>
                <ReturnDetailImg imgName={"왼쪽"} img={returnData.image_left}/>
                <ReturnDetailImg imgName={"오른쪽"} img={returnData.image_right}/>
                <ReturnDetailImg imgName={"안쪽"} img={returnData.image_inside}/>
                <table id="ReturnDetailTable" width={"100%"}>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>카테고리</th><td>{returnData.category}</td>
                        </tr>
                        {user === "0101010101" ? <tr>
                            <th>업체</th><td>{returnData.market_name}</td>
                        </tr> : null}
                        <tr>
                            <th>환불 아이디</th><td>{returnData.return_id}</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <div id="ButtonReturnApproveOptionWrap">
                    {user === "0101010101" && returnData.return_state === "false"? <ButtonConfirm buttonName={"환불 승인"} onConfirmClick={() => {returnApproveClick("approve")}}/> : null}
                    {user === "0101010101" && returnData.return_state === "false" ? <ButtonConfirm buttonName={"환불 거절"} onConfirmClick={() => {upDateReturnState("refuse")}}/> : null}
                    {user === "0101010101" && returnData.return_state === "true"? <ButtonConfirm buttonName={"승인 취소"} onConfirmClick={() => {returnApproveClick("cancel")}}/> : null}
                    {user === "0101010101" && returnData.return_state === "refused"? <ButtonConfirm buttonName={"반례 등록"} onConfirmClick={() => {setCounter(true)}}/> : null}
                </div>
            </div>
        </div>
    )
}

export default ReturnDetail;