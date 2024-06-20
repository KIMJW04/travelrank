import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../assets/img/main_img01.jpg";
import mainImage02 from "../assets/img/main_img02.svg";

const Main = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate("/section01");
    };

    return (
        <div className="main-container">
            <img src={mainImage} alt="Travel" className="main-image" />
            <div className="main__inner">
                <div className="main-content">
                    <h1>TRAVEL LIST</h1>
                    <p>
                        본 프로젝트에 사용된 모든 정보는 네이버 '가볼만한곳'에서 가져온 것입니다. 이 사진들은 포트폴리오 용도로만 사용되었으며, 상업적
                        목적이 없음을 알려드립니다. 해당 사진들의 저작권은 원저작자에게 있으며, 본 사이트는 이에 대한 어떠한 책임도 지지 않습니다.
                    </p>
                </div>
                <button className="start-button" onClick={handleStartClick}>
                    <p>start</p>
                    <span className="arrow_icon"></span>
                </button>
            </div>

            <div className="box01">
                <img src={mainImage02} alt="travel" className="mainimg02" />
            </div>
        </div>
    );
};

export default Main;
