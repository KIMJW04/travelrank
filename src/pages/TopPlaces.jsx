import React, { useState, useEffect } from "react";
import axios from "axios";
import regionList from "../assets/json/RegionList.json";

const TopPlaces = () => {
    const [topPlaces, setTopPlaces] = useState({});
    const [date, setDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split("T")[0];
    });

    useEffect(() => {
        fetchTopPlaces();
    }, [date]); // 날짜가 바뀔 때마다 상위 장소 데이터를 다시 가져옵니다.

    const fetchTopPlaces = async () => {
        try {
            const topPlacesData = {};

            for (const [regionKorean, regionData] of Object.entries(regionList)) {
                const regionEnglish = regionData.region;
                const subRegionKeys = Object.keys(regionData.subRegions);
                const subRegionEnglish = regionData.subRegions[subRegionKeys[0]];

                const url = `https://raw.githubusercontent.com/KIMJW04/travel-list-chart/main/travelrank_list/${date}/${regionEnglish}/chart_travel_${subRegionEnglish}-${date}.json`;

                try {
                    const response = await axios.get(url);
                    topPlacesData[regionKorean] = response.data.slice(0, 3); // 상위 3개 장소만 저장
                } catch (error) {
                    console.error(`Failed to fetch data for ${regionKorean}: ${error.message}`);
                }
            }

            setTopPlaces(topPlacesData);
        } catch (error) {
            console.error("Failed to fetch top places:", error);
        }
    };

    return (
        <div className="top-places">
            {Object.entries(topPlaces).map(([regionKorean, places]) => (
                <div key={regionKorean} className="region-top-places">
                    <h3>{regionKorean}</h3>
                    <ul>
                        {places.map((place, index) => (
                            <li key={index}>{place.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TopPlaces;
