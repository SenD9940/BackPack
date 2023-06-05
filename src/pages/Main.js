import React from "react";
import logoBackpack from "../backpacklogo.png";
import Navigation from '../components/Navigation';
import "./Main.css";
import Footer from "../components/Footer";
function Main(){
    return(
        <div id="Main">
            <div id="MainHeaderWrap">
                <img id="MainLogo" src={logoBackpack} alt="backpack"/>
                <Navigation />
            </div>
            <div id="MainContents">
                <div id="MainImgWrap">
                    <img id="MainImg"></img>
                    <div id="ImgBackGround">
                        <div id="MainImgTitleWrap">
                            <div id="MainImgTitle">BACKPACK</div>
                            <div id="MainImgSubTitle">10분안에 환불 가능한 시대를 열다</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Main;