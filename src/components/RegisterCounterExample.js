import React, { useEffect, useState } from "react";
import "../css/RegisterCounterExample.css";
import { disableScroll, enableScroll } from "../functions/scroll";
import ButtonConfirm from "./ButtonConfrim";
import ButtonCancel from "./ButtonCancel";
import TextInputForm from "./TextInputForm";
import SelectImage from "./SelectImage";
import ImageDesc from "./ImageDesc";
import { useDispatch, useSelector } from "react-redux";
import { setCounterTempData } from "../redux/action";

function RegisterCounterExample(){
    const [input, setInput] = useState([]);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const counterTempData = useSelector(state => state.counterTempData);
    console.log(counterTempData);
    function onChange(e){
        const {name, value} = e.target;
        setInput({
            ...input, [name]:value
        });
    }

    function addImg(){
        const imageInput = document.getElementById("RegisterCounterExampleInputFile");
        imageInput.click();
    }

    function onImageInput(e){
        const image = e.target.files[0];
        if(image){
            let array = counterTempData;
            dispatch(setCounterTempData(array.concat([{img:image, desc:""}])));
        }
    }

    function setDescLayout(){
        let descLayout = []
        if(counterTempData.length){
            for(let i = 0; i < counterTempData.length; i++){
                descLayout.push(<ImageDesc key={i} image={counterTempData[i].img} onImageClick={() => onImageClick(i)}/>)
            }
        }
        else{
            for(let i = 0; i < images.length; i++){
                descLayout.push(<ImageDesc key={i} image={images[i]} onImageClick={() => onImageClick(i)}/>)
            }
        }
        return descLayout;
    }

    function onImageClick(idx){
        const newImageDesc = counterTempData.filter((value, index)=>{
            return index !== idx;
        })
        dispatch(setCounterTempData(newImageDesc));
    }

    console.log(counterTempData);

    return(
        <div id="RegisterCounterExample">
            <div id="RegisterCounterExampleContents">
            <header id="RegisterCounterExampleHeader">
                <div id="RegisterCounterExampleTitle">반례 등록</div>
                <div id="RegisterCounterExampleSubTitle">사진 밑에 반례에 대한 설명을 추가해 주세요</div>
            </header>
            <div id="RegisterCounterExampleBody">
                <input type="file" id="RegisterCounterExampleInputFile" accept=".gif, .jpg, .png" onInput={onImageInput}></input>
                <button id="RegisterCounterExampleButtonAddImage" onClick={addImg}>이미지 추가</button>
                {images.length || counterTempData.length ? setDescLayout() : null}
            </div>
            <footer id="RegisterCounterExampleFooter" >
                <ButtonCancel buttonName={"취소"} />
                <ButtonConfirm buttonName={"등록"}/>
            </footer>
            </div>
        </div>
    )
}


export default RegisterCounterExample;