import React, { useEffect, useState } from "react";
import "./Customer.css";
import Header from "../components/Header";
import TextInputForm from "../components/TextInputForm";
import ButtonConfirm from "../components/ButtonConfrim";
import SelectImage from "../components/SelectImage";
import {readFireStore, uploadStorage, writeFireStore } from "../server/firebase";
import Modal from "../components/Modal";
import { v4 as uuidv4  } from "uuid";
import Loading from "../components/Loading";
import { encrypto } from "../functions/crypto";
import PhoneAuth from "../components/PhoneAuth";
import { useNavigate } from 'react-router-dom';
import SelectInputForm from "../components/SelectInputForm";
import { listDataSelectedValidationCheck, lengthValidationCheck } from "../functions/ValidationCheck";
import { searchAddress } from "../server/publicData";

function Customer(){
    const navigate = useNavigate();
    const [address, setAddress] = useState([]);
    const [input, setInput] = useState({
        name:'',
        phone:'',
        address:'',
        address_detail:'',
        category:"",
        market:"",
        auth_code:"",
        comment_detail:"",
        comment_option:""
    })
    const [inputState, setInputState] = useState({
        name:false,
        phone:false,
        address:false,
        address_detail:false,
        category:false,
        market:false,
        auth_code:false
    })
    const [img, setImg] = useState({ 
        image_front:"",
        image_left:"",
        image_right:"",
        image_back:"",
        image_inside:""
    })
    const [loading, setLoading] = useState(false);
    const [persentloading, setPersentLoading] = useState(false);
    const [categorys, setCategorys] = useState([])
    const [markets, setMarkets] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [phoneUid, setPhoneUid] = useState();
    const [persent, setPersent] = useState(0);


    async function searchAddr(value){
        const address = await searchAddress(value);
        setAddress(address);
    }

    useEffect(()=>{
        getCategory();
        getMarket();
    }, []);

    async function getCategory(){
        await readFireStore("category").then(res => {
            res.forEach(data => {
                setCategorys(category => [...category, {
                    category_name:data.data().category_name,
                    category_name_kor:data.data().category_name_kor
                }]);
            });
        });
    }

    async function getMarket(){
        await readFireStore("market").then(res => {
            res.forEach(data => {
                setMarkets(market => [...market, {
                    market_name:data.data().market_name,
                    market_no:data.data().market_no
                }]);
            });
        });
    }
    
    function onChange(e){
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]:value
        })

        const res = validationCheck(name, value);
        if(name === "address" && res){
            setAddress([]);
        }
        setInputState({
            ...inputState,
            [name]:res
        })
    }

    function validationCheck(name, value){
        var state = false;
        if(name === "phone"){
            return;
        }else if(name === "name" || name === "address_detail"){
            state = lengthValidationCheck(value);
        }else if(name === "address"){
            state = listDataSelectedValidationCheck(value, address);
        }else if(name === "category"){
            state = listDataSelectedValidationCheck(value, categorys.map(row => row.category_name_kor));
        }else if(name === "market"){
            state = listDataSelectedValidationCheck(value, markets.map(row => row.market_no));
        }
        return state;
    }

    function datalistAddress(){
        let addressOptinos = [<option key={0} value={input.address} disabled>주소 선택</option>];
        for(var i = 0; i < address.length; i++){
            addressOptinos.push(<option key={i + 1} value={address[i]}>{address[i]}</option>);
        }
        
        return addressOptinos;
    }

    function datalistCategory(){
        let categoryOptions = [<option key={0} value="" disabled>카테고리 선택</option>];
        for(var i = 0; i < categorys.length; i++){
            categoryOptions.push(<option key={i + 1} value={categorys[i].category_name_kor}>{categorys[i].category_name_kor}</option>);
        }
        
        return categoryOptions;
    }

    function datalistMarket(){
        let marketOptions = [<option key={0} value="" disabled>쇼핑몰 선택</option>];
        for(var i = 0; i < markets.length; i++){
            marketOptions.push(<option key={i + 1} value={markets[i].market_no}>{markets[i].market_name}</option>);
        }
        
        return marketOptions;
    }

    function datalistCommentOption(){
        let commentOptions = [<option key={0} value="" disabled>환불사유 선택</option>];
        return commentOptions;
    }

    function setUploadImage(callback){
        const imgkeys = Object.keys(img);
        for(var i = 0; i < imgkeys.length; i++){
            if(img[imgkeys[i]].length === 0){
                alert("이미지를 5개 입력하여야 합니다");
                return false;
            }
        }
        callback(true);
    }

    async function uploadImage(){
        var is_img_set = false;
        setUploadImage((res) =>{
            is_img_set = res;
        })
        if(is_img_set){
            setPersentLoading(true);
            let urls = [];
            const imgkeys = Object.keys(img);
            for(var i = 0; i < imgkeys.length; i++){
                const key = imgkeys[i];
                const persent = persentloading.persent;
                await uploadStorage(img[key]).then(res => {
                    setPersent(per => per + 20);
                    urls.push(res);
                });
            }
            return urls;
        }
    }
    async function submit(){
        let uploadState = true;
        const inputStateKeys = Object.keys(inputState);
        for(var i = 0; i < inputStateKeys.length; i++){
            if(!inputState[inputStateKeys[i]]){
                uploadState = false;
                break;
            }
        }
        if(uploadState){
            const urls = await uploadImage();
            const return_id = uuidv4();
            if(urls.length !== 0){
                const phone = encrypto(input.phone);
                const address = encrypto(input.address);
                const address_detail = encrypto(input.address_detail);
                var d = new Date();
                writeFireStore("return", {
                    application_date:d,
                    return_id:return_id,
                    customer_name:input.name,
                    customer_phone:phone,
                    customer_address:address,
                    address_detail:address_detail,
                    market_no:input.market,
                    category:input.category,
                    image_front:urls[0],
                    image_left:urls[1],
                    image_right:urls[2],
                    image_back:urls[3],
                    image_inside:urls[4],
                    return_state:"false"
                }).then(res => {
                    setPersentLoading(false);
                    setModalShow(true);
                })
            }else{
                alert("이미지 업로드 실패");
            }
        }else{
            alert("입력란을 확인해 주세요");
        }
    }

    function onModalConfirmClick(){
        navigate("/");
    }

    return(
        <div id="Customer">
            {persentloading? <Loading loadingLabel={"업로드중" + persent + "%"}/> : null}
            {loading ? <Loading loadingLabel={"정보 확인중"}/> : null}
            {modalShow? <Modal title={"등록 성공"} subTitle={"등록에 성공하였습니다"} onModalConfirm={onModalConfirmClick}/> : null}
            <Header title={"환불"} subTitle={"누구보다 빠른 환불 시스템"}/>
            <div id="CustomerContentsWrap">
               <div id="CustomerContents">
                    <TextInputForm name={"name"} placeholder={"이름"} value={input.name} onChange={onChange} state={inputState.name}/>
                    <PhoneAuth onChange={onChange} input={input} setInput={setInput} inputState={inputState} setInputState={setInputState} setPhoneUid={setPhoneUid}/>
                    <div className="TextInputForm">
                        <input type="search" className="TextInput" id="InputAddressDetail" name={"address"} value={input.address} onChange={onChange} placeholder="주소 (검색할 주소를 입력하고 엔터키)" onKeyUp={(e)=>{
                            if(e.key === "Enter"){
                                searchAddr(input.address);
                            }
                        }}></input>
                        {address.length !== 0 ?<select className="SelectInput" name={"address"} value={input.address} onChange={onChange}>{datalistAddress()}</select> : null}
                        {input.address? <div className="TextInputLabel" style={inputState.address?{color:"green"}:{color:"red"}}>{inputState.address? "확인되었습니다" : "주소를 정확하게 입력해 주세요" }</div> : null}
                    </div>
                    <TextInputForm name={"address_detail"} value={input.address_detail} onChange={onChange} placeholder={"상세주소"} state={inputState.address_detail}/>
                    <SelectInputForm name={"market"} value={input.market} onChange={onChange} options={datalistMarket()}/>
                    <SelectInputForm name={"category"} value={input.category} onChange={onChange} options={datalistCategory()}/>
                    <SelectInputForm name={"comment_option"} value={input.comment_option} onChange={onChange} options={datalistCommentOption()}/>
                    <TextInputForm name={"comment_detail"} value={input.comment_detail} onChange={onChange} placeholder={"환불 상세 사유"} state={inputState.address_detail}/>
                    <div id="ImageUploadWrap">
                        <div style={{width:"100%", textAlign:"center"}}>이미지 등록</div>
                        <SelectImage label={"앞면"} imageId={"image_front"} img={img} selectedImg={img.image_front} setImg={setImg}/>
                        <SelectImage label={"뒷면"} imageId={"image_back"} img={img} selectedImg={img.image_back} setImg={setImg}/>
                        <SelectImage label={"왼쪽면"} imageId={"image_left"} img={img} selectedImg={img.image_left} setImg={setImg}/>
                        <SelectImage label={"오른쪽"} imageId={"image_right"} img={img} selectedImg={img.image_right} setImg={setImg}/>
                        <SelectImage label={"안쪽면"} imageId={"image_inside"} img={img} selectedImg={img.image_inside} setImg={setImg} />
                    </div>
                    <ButtonConfirm buttonName={"환불 신청"} onConfirmClick={submit}/>
               </div>
            </div>
        </div>
    );
}


export default Customer;