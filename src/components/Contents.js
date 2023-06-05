import React from "react";
import "../css/Contents.css";
import mainImg from "../introimg.jpeg";
function Contents(){
    return(
        <div id="Contents">
            <div id="ContentsImageWrap">
                <img id="ContentsImage" src={mainImg}/>
            </div>
        </div>
    );
}

export default Contents;