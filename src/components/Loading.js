import React, { useEffect } from 'react'; 
import {Triangle} from "react-loader-spinner";
import "../css/Loading.css"; 
import { disableScroll, enableScroll } from '../functions/scroll';

function Loading({loadingLabel}){ 
    useEffect(()=>{
        disableScroll();
 
    return () => enableScroll();
    },[])
    return (
        <div id='Loading'>
            <div id='LoadingWrap'>
                <Triangle color="#363636" height={200} width={200}/>
                <div id='LoadingLabel'>{loadingLabel}</div>
            </div>
        </div> 
    ); 
}; 
export default Loading;

