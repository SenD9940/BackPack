import React, { useEffect, useState } from "react";
import "../css/ImageDesc.css";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setCounterTempData } from "../redux/action";

function ImageDesc({id, data, onImageClick}){
    const dispatch = useDispatch();
    const counterTempData = useSelector(state => state.counterTempData);
    const [modal, setModal] = useState(false);
    const [desc, setDesc] = useState("");
    const [imgSrc, setImageSrc] = useState("");
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImageSrc(reader.result);
            resolve();
          };
        });
    };

    function onChange(e){
        const {name, value} = e.target;
        setDesc(value);
    }

    useEffect(() => {
        setDesc(counterTempData.contents[id].desc);
    }, [])

    useEffect(()=>{
        let counterTempList = counterTempData;
        let newData = counterTempList.contents[id];
        newData["desc"] = desc;
        counterTempList.contents[id] = newData;
        dispatch(setCounterTempData(counterTempList));
    }, [desc])

    if(typeof data.img !== "string"){
        encodeFileToBase64(data.img);
    }

    function onModalCancelClick(){
        setModal(false);
    }

    function onModalConfirmClick(){
        setModal(false);
        onImageClick();
    }

    function onImageClick(){
        const newImageDesc = counterTempData.contents.filter((value, index)=>{
            return index !== id;
        })
        console.log(newImageDesc);
        dispatch(setCounterTempData({...counterTempData, contents:newImageDesc}));
    }
    console.log(counterTempData);

    return(
        <div id="ImageDesc">
            {modal ? <Modal title={data.img.name} subTitle={"확인을 누르면 이미지를 삭제합니다"} onModalConfirm={onModalConfirmClick} onModalCancel={onModalCancelClick}/> : null}
            <img className="ImageDescImg" src={imgSrc ? imgSrc : data.img} onClick={()=> setModal(true)}/>
            <textarea className="ImageDescTextarea" name={"desc"} onChange={onChange} defaultValue={desc} />
        </div>
    )
}

export default ImageDesc