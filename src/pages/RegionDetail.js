import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import regionList from "../assets/json/RegionList.json";
import { NextArrow, PrevArrow } from "../components/CustomArrows";
import Loading from "../components/Loading";  // 로딩 컴포넌트 임포트

const RegionDetail = () => {
    const { regionId } = useParams();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedSubRegion, setSelectedSubRegion] = useState("");
    const [date, setDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split("T")[0];
    });
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 추가
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        if (regionId) {
            const [regionKorean, subRegionKorean] = regionId.split("-");
            console.log("Initial region (Korean):", regionKorean);
            console.log("Initial subRegion (Korean):", subRegionKorean);

            if (regionList[regionKorean]) {
                setSelectedRegion(regionKorean);
                if (regionList[regionKorean].subRegions[subRegionKorean]) {
                    setSelectedSubRegion(subRegionKorean);
                } else {
                    setSelectedSubRegion(Object.keys(regionList[regionKorean].subRegions)[0]);
                }
            }
        }
    }, [regionId]);

    useEffect(() => {
        if (selectedRegion && selectedSubRegion) {
            const regionEnglish = regionList[selectedRegion]?.region;
            const subRegionEnglish = regionList[selectedRegion]?.subRegions[selectedSubRegion];
            console.log("Selected region:", selectedRegion, "->", regionEnglish);
            console.log("Selected subRegion:", selectedSubRegion, "->", subRegionEnglish);
            if (regionEnglish && subRegionEnglish) {
                fetchData(regionEnglish, subRegionEnglish, date);
            }
        }
    }, [selectedRegion, selectedSubRegion, date]);

    const fetchData = async (region, subRegion, date) => {
        setIsLoading(true);  // 데이터 요청 전 로딩 시작
        const url = `https://raw.githubusercontent.com/KIMJW04/travel-list-chart/main/travelrank_list/${date}/${region}/chart_travel_${subRegion}-${date}.json`;

        console.log(`Fetching data from URL: ${url}`);

        try {
            const response = await axios.get(url);
            setData(response.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setTimeout(() => setIsLoading(false), 1000);  // 최소 1초 로딩
        }
    };

    const handleRegionChange = (e) => {
        const newRegion = e.target.value;
        setSelectedRegion(newRegion);
        if (regionList[newRegion]?.subRegions) {
            const firstSubRegion = Object.keys(regionList[newRegion].subRegions)[0];
            setSelectedSubRegion(firstSubRegion);
        } else {
            setSelectedSubRegion("");
        }
    };

    const handleSubRegionChange = (e) => {
        setSelectedSubRegion(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleWheel = (e) => {
        if (e.deltaY < 0) {
            sliderRef.current.slickPrev();
        } else {
            sliderRef.current.slickNext();
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentIndex(next),
        nextArrow: currentIndex < data.length - 5 ? <NextArrow /> : null,
        prevArrow: currentIndex > 0 ? <PrevArrow /> : null,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
        ],
    };

    return (
        <div className="region-detail" onWheel={handleWheel}>
            <h1>Region Detail</h1>
            <div className="controls">
                <select value={selectedRegion} onChange={handleRegionChange}>
                    <option value="" disabled>
                        Select a region
                    </option>
                    {Object.keys(regionList).map((regionKey) => (
                        <option key={regionKey} value={regionKey}>
                            {regionKey}
                        </option>
                    ))}
                </select>
                <select value={selectedSubRegion} onChange={handleSubRegionChange} disabled={!selectedRegion}>
                    <option value="" disabled>
                        Select a sub-region
                    </option>
                    {selectedRegion &&
                        Object.keys(regionList[selectedRegion].subRegions).map((subRegionKey) => (
                            <option key={subRegionKey} value={subRegionKey}>
                                {subRegionKey}
                            </option>
                        ))}
                </select>
                <input type="date" value={date} onChange={handleDateChange} />
            </div>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <p className="error">{error}</p>
            ) : data.length > 0 ? (
                <Slider ref={sliderRef} {...settings} className="slider">
                    {data.map((item, index) => (
                        <div key={index} className="card">
                            <img src={item.image_url} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>
                                <strong>Category:</strong> {item.title_cate}
                            </p>
                            <p>
                                <strong>Address:</strong> {item.addresses}
                            </p>
                            <p>
                                <strong>Blog Reviews:</strong> {item.blog_review}
                            </p>
                            <p>
                                <strong>Visitor Reviews:</strong> {item.human_review}
                            </p>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>Select a region and sub-region to load data</p>
            )}
        </div>
    );
};

export default RegionDetail;
