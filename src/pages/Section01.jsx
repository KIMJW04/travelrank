import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import cities from '../data/cities';
import cityicon from '../assets/img/citypage_icon.png';

const MAX_VISIBILITY = 3;

const Card = ({ title, description, image, alt }) => (
    <div className='city-card'>
        <img src={image} alt={alt} className="city-image" />
        <div className="city-info">
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="detail_button">상세보기</button>
        </div>
    </div>
);

const Carousel = ({ children }) => {
    const [active, setActive] = useState(2);
    const count = React.Children.count(children);

    return (
        <div className='carousel'>
            {active > 0 && <button className='nav up' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline /></button>}
            <div className='cards-container'>
                {React.Children.map(children, (child, i) => (
                    <div className='card-container' style={{
                        '--active': i === active ? 1 : 0,
                        '--offset': (active - i) / 3,
                        '--direction': Math.sign(active - i),
                        '--abs-offset': Math.abs(active - i) / 3,
                        'pointer-events': active === i ? 'auto' : 'none',
                        'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                        'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                    }}>
                        {child}
                    </div>
                ))}
            </div>
            {active < count - 1 && <button className='nav down' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline /></button>}
        </div>
    );
};

const Section01 = () => (
    <>
        <div className="city-section">
            <img src={cityicon} alt='시티아이콘'></img>
            <h1>City</h1>
        </div>
        <div className='cont'>
            <div className='section_img'></div>
            <div className="city-list">
                <Carousel>
                    {cities.map((city, index) => (
                        <Card
                            key={index}
                            title={city.name}
                            description={city.description}
                            image={city.image}
                            alt={city.alt}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    </>
);

export default Section01;
