import React from 'react';
import { useNavigate } from 'react-router-dom';
import mainImage from '../assets/img/main_img01.jpg';
import mainImage02 from '../assets/img/main_img02.svg';

const Main = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/section01');
    };

    return (
        <div className="main-container">
            <img src={mainImage} alt="Travel" className="main-image" />
            <div className="main-content">
                <h1>TRAVEL LIST</h1>
                <p>
                    Find the best travel destinations and restaurants in Korea with ease!<br />
                    Discover our recommended spots to make your trip special.
                </p>
            </div>
            <button className="start-button" onClick={handleStartClick}>
                <p>start</p>
                <span className='arrow_icon'></span>
            </button>

            <div className="box01">
                <img src={mainImage02} alt="travel" className="mainimg02" />
            </div>
        </div>


    );
};

export default Main;
