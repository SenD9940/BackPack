import React, { useState } from "react";
import "../css/SelectImage.css";
import SetImage from "./SetImage";

function SelectImage({label, imageId, img, setImg, selectedImg}){
    const [imgSrc, setImageSrc] = useState('');
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
    function onInput(e){
        encodeFileToBase64(e.target.files[0]);
        setImg({
            ...img,
            [imageId]:e.target.files[0]
        })
    }
    function deleteImg(){
        setImageSrc("")
        setImg({
            ...img,
            [imageId]:''
        })
    }
    return(
        <div id="SelectImageWrap">
            <input type="file" id={imageId} style={{display:"none"}} onChange={onInput} accept=".gif, .jpg, .png"/>
            {imgSrc ? <img className="SelectedImage" src={imgSrc} onClick={deleteImg}/> : <SetImage imageId={imageId} label={label}/>}
        </div>
    )
}


export default SelectImage;