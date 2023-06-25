import React, { useState } from "react";
import "../css/ImageDesc.css";
import Modal from "./Modal";

function ImageDesc({image, name, desc, onChange, onImageClick}){
    const [modal, setModal] = useState(false);
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

    if(typeof image !== "string"){
        encodeFileToBase64(image);
    }

    function onModalCancelClick(){
        setModal(false);
    }

    function onModalConfirmClick(){
        setModal(false);
        onImageClick();
    }

    return(
        <div id="ImageDesc">
            {modal ? <Modal title={image.name} subTitle={"확인을 누르면 이미지를 삭제합니다"} onModalConfirm={onModalConfirmClick} onModalCancel={onModalCancelClick}/> : null}
            <img className="ImageDescImg" src={imgSrc ? imgSrc : image} onClick={()=> setModal(true)}/>
            <textarea className="ImageDescTextarea" name={name} onChange={onChange} value={desc} placeholder="이미지에 대한 설명을 적어주세요"/>
        </div>
    )
}

export default ImageDesc