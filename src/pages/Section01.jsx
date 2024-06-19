import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import cities from '../data/cities';
import cityicon from '../assets/img/citypage_icon.png';

const MAX_VISIBILITY = 2;

const Card = ({ title, description, image, alt, onDetailClick }) => (
    <div className='city-card'>
        <img src={image} alt={alt} className="city-image" />
        <div className="city-info">
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="detail_button" onClick={onDetailClick}>상세보기</button>
        </div>
    </div>
);

const Carousel = ({ children, activeIndex }) => {
    const [active, setActive] = useState(MAX_VISIBILITY);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const count = React.Children.count(children);
    const childrenArray = React.Children.toArray(children);
    const carouselRef = useRef(null);

    const updateIndex = useCallback((newIndex) => {
        if (newIndex < 0) {
            setActive(count - 1 + MAX_VISIBILITY);
        } else if (newIndex >= count + MAX_VISIBILITY) {
            setActive(0 + MAX_VISIBILITY);
        } else {
            setActive(newIndex);
        }
    }, [count]);

    useEffect(() => {
        if (active === count + MAX_VISIBILITY) {
            setTimeout(() => {
                setTransitionEnabled(false);
                setActive(MAX_VISIBILITY);
            }, 300);
        } else if (active === MAX_VISIBILITY - 1) {
            setTimeout(() => {
                setTransitionEnabled(false);
                setActive(count + MAX_VISIBILITY - 1);
            }, 300);
        } else {
            setTransitionEnabled(true);
        }
    }, [active, count]);

    useEffect(() => {
        const handleWheel = (event) => {
            if (event.deltaY < 0) {
                updateIndex(active - 1);
            } else {
                updateIndex(active + 1);
            }
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (carousel) {
                carousel.removeEventListener('wheel', handleWheel);
            }
        };
    }, [active, updateIndex]);

    useEffect(() => {
        if (activeIndex) {
            activeIndex(active - MAX_VISIBILITY);
        }
    }, [active, activeIndex]);

    return (
        <div className='carousel' ref={carouselRef}>
            <div className='cards-container'>
                <button className='nav up' onClick={() => updateIndex(active - 1)}><TiChevronLeftOutline /></button>
                {[...childrenArray.slice(-MAX_VISIBILITY), ...childrenArray, ...childrenArray.slice(0, MAX_VISIBILITY)].map((child, i) => (
                    <div className={`card-container ${i === active ? 'center-card' : ''}`} key={i} style={{
                        '--active': i === active ? 1 : 0,
                        '--offset': (i - active) / 3,
                        '--direction': Math.sign(i - active),
                        '--abs-offset': Math.abs(i - active) / 3,
                        'pointer-events': active === i ? 'auto' : 'none',
                        'opacity': Math.abs(i - active) >= MAX_VISIBILITY ? '0' : '1',
                        'display': Math.abs(i - active) > MAX_VISIBILITY ? 'none' : 'block',
                        'transition': transitionEnabled ? 'all 0.3s ease-out' : 'none',
                    }}>
                        {child}
                    </div>
                ))}
                <button className='nav down' onClick={() => updateIndex(active + 1)}><TiChevronRightOutline /></button>
            </div>
        </div>
    );
};

const cityTranslations = {
    'Seoul': '서울',
    'Busan': '부산',
    'Daegu': '대구',
    'Incheon': '인천',
    'Gwangju': '광주',
    'Daejeon': '대전',
    'Ulsan': '울산',
    'Sejong': '세종',
    'Gyeonggi': '경기도',
    'Gangwon': '강원도',
    'Chungcheongbuk': '충청북도',
    'Chungcheongnam': '충청남도',
    'Jeollabuk': '전라북도',
    'Jeollanam': '전라남도',
    'Gyeongsangbuk': '경상북도',
    'Gyeongsangnam': '경상남도',
    'Jeju': '제주도'
};

const Section01 = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState(cities.map(city => ({ ...city, visible: true })));

    useEffect(() => {
        setImages(images => images.map((img, index) => ({
            ...img,
            visible: index === currentIndex
        })));
    }, [currentIndex]);

    const handleDetailClick = (cityName) => {
        const translatedCityName = cityTranslations[cityName];
        navigate(`/RegionDetail/${translatedCityName}`);
    };

    const handleBackClick = () => {
        navigate('/'); // 메인 페이지로 이동
    };

    return (
        <>
            <div className="city-section">
                <img src={cityicon} alt='시티아이콘'></img>
                <h1>City</h1>
                <button className="back-button" onClick={handleBackClick}>◀︎ 이전으로</button>
            </div>
            <div className='cont'>
                <div className='section_img'>
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img.image}
                            alt={img.alt}
                            className={img.visible ? '' : 'hidden'}
                        />
                    ))}
                </div>
                <div className="city-list">
                    <Carousel activeIndex={setCurrentIndex}>
                        {cities.map((city, index) => (
                            <Card
                                key={index}
                                title={city.name}
                                description={city.description}
                                image={city.image}
                                alt={city.alt}
                                onDetailClick={() => handleDetailClick(city.name)}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
};

export default Section01;
