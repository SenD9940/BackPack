import React, {useEffect } from "react";
import "../css/Modal.css";
import { disableScroll, enableScroll } from "../functions/scroll";
function Modal({title, subTitle, onModalConfirm, onModalCancel}){
    useEffect(()=>{
        disableScroll();
 
    return () => enableScroll();
    },[])
    return(
        <div id="Modal">
            <div id="ModalContentWrap">
                <div id="ModalTitle">{title}</div>
                <div id="ModalSubTitle">{subTitle}</div>
                <div id="ModalButtonWrap">
                    <div id="ModalButtonContents" width="300px">
                        {onModalCancel ?<button id="ModalButtonCancel" onClick={onModalCancel}>취소</button> : null}
                        <button id="ModalButtonConfirm" onClick={onModalConfirm}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;