import React, { useEffect, useState } from "react";
import "../css/RegisterCounterExample.css";
import { disableScroll, enableScroll } from "../functions/scroll";
import ButtonConfirm from "./ButtonConfrim";
import ButtonCancel from "./ButtonCancel";
import TextInputForm from "./TextInputForm";
import SelectImage from "./SelectImage";
import ImageDesc from "./ImageDesc";
import { useDispatch, useSelector } from "react-redux";
import { setCounterTempData, setSelectedSubNavItem } from "../redux/action";
import Modal from "./Modal";
import { uploadStorage, writeFireStore } from "../server/firebase";
import Loading from "./Loading";

function RegisterCounterExample(){
    const [input, setInput] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const counterTempData = useSelector(state => state.counterTempData);
    console.log(counterTempData);

    function addImg(){
        const imageInput = document.getElementById("RegisterCounterExampleInputFile");
        imageInput.click();
    }

    function onImageInput(e){
        const image = e.target.files[0];
        if(image){
            let array = counterTempData.contents;
            dispatch(setCounterTempData({...counterTempData, contents:array.concat([{img:image, desc:""}])}));
        }
    }

    function setDescLayout(){
        let descLayout = []
        for(let i = 0; i < counterTempData.contents.length; i++){ 
            descLayout.push(<ImageDesc key={i} id={i} data={counterTempData.contents[i]}/>)
        }
        return descLayout;
    }


    function onRegisterCancelClick(){
        dispatch(setCounterTempData({title:"", contents:[]}));
        dispatch(setSelectedSubNavItem("조회"));
    }

    async function registerClick(){
        setRegisterModal(false);
        setLoading(true);
        for(let i = 0; i < counterTempData.contents.length; i++){
            await uploadStorage(counterTempData.contents[i].img).then(res => {
                let newCounterData = counterTempData;
                newCounterData.contents[i] = res;
                dispatch(setCounterTempData({...counterTempData, contents:newCounterData}));
            })
        }

        for(let i = 0; i < counterTempData.contents.length; i++){
            if(typeof counterTempData.contents[i] !== "string"){
                return;
            }
        }

        writeFireStore("counter", counterTempData).then(res => {
            dispatch(setCounterTempData({title:"", contents:[]}));
            dispatch(setSelectedSubNavItem("조회"));
        }).catch(err => {
            console.log(err);
        })
    }

    function onChange(e){
        const {name, value} = e.target;
        dispatch(setCounterTempData({...counterTempData, [name]:value}))
    }

    return(
        <div id="RegisterCounterExample">
            {loading ? <Loading loadingLabel={"이미지 업로드중"}/> : null}
            {deleteModal ? <Modal title={"경고"} subTitle={"확인 버튼을 누르시면 작성중인 데이터가 삭제 됩니다"} onModalCancel={() => setDeleteModal(false)} onModalConfirm={onRegisterCancelClick}/> : null}
            {registerModal ? <Modal title={"반례 등록"} subTitle={"확인 버튼을 누르시면 반례가 등록됩니다"} onModalCancel={() => setRegisterModal(false)} onModalConfirm={registerClick}/> : null}
            <div id="RegisterCounterExampleContents">
            <header id="RegisterCounterExampleHeader">
                <div id="RegisterCounterExampleTitle">반례 등록</div>
                <div id="RegisterCounterExampleSubTitle">사진 밑에 반례에 대한 설명을 추가해 주세요</div>
            </header>
            <div id="RegisterCounterExampleBody">
                <input id="RegisterCounterExampleInputTitle" placeholder="제목을 입력하세요" value={counterTempData.title} name="title" onChange={onChange}/>
                <input type="file" id="RegisterCounterExampleInputFile" accept=".gif, .jpg, .png" onInput={onImageInput}></input>
                {counterTempData.contents.length ? setDescLayout() : null}
                <button id="RegisterCounterExampleButtonAddImage" onClick={addImg}>이미지 추가</button>
            </div>
            <footer id="RegisterCounterExampleFooter" >
                <ButtonCancel buttonName={"취소"} onCancelClick={() => setDeleteModal(true)}/>
                <div style={{width:"120px"}}>
                    <ButtonConfirm buttonName={"등록"} onConfirmClick={() => counterTempData.contents.length ? setRegisterModal(true): null}/>
                </div>
            </footer>
            </div>
        </div>
    )
}


export default RegisterCounterExample;