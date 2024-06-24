import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import regionList from "../assets/json/RegionList.json";

const TopPlaces = () => {
    const [topPlaces, setTopPlaces] = useState({});
    const date = (() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split("T")[0];
    })();

    const fetchTopPlaces = useCallback(async () => {
        try {
            const topPlacesData = {};

            for (const [regionKorean, regionData] of Object.entries(regionList)) {
                const regionEnglish = regionData.region;
                topPlacesData[regionKorean] = [];

                for (const subRegionKorean of Object.keys(regionData.subRegions)) {
                    const subRegionEnglish = regionData.subRegions[subRegionKorean];
                    const url = `https://raw.githubusercontent.com/KIMJW04/travel-list-chart/main/travelrank_list/${date}/${regionEnglish}/chart_travel_${subRegionEnglish}-${date}.json`;

                    try {
                        const response = await axios.get(url);
                        topPlacesData[regionKorean].push({
                            subRegion: subRegionKorean,
                            places: response.data.slice(0, 3),
                        });
                    } catch (error) {
                        console.error(`Failed to fetch data for ${subRegionKorean}: ${error.message}`);
                    }
                }
            }

            setTopPlaces(topPlacesData);
        } catch (error) {
            console.error("Failed to fetch top places:", error);
        }
    }, [date]);

    useEffect(() => {
        fetchTopPlaces();
    }, [fetchTopPlaces]);

    return (
        <div className="top-places">
            {Object.entries(topPlaces).map(([regionKorean, subRegions]) => (
                <div key={regionKorean} className="region-top-places">
                    <h3>{regionKorean}</h3>
                    {subRegions.map(({ subRegion, places }) => (
                        <div key={subRegion}>
                            <h4>{subRegion}</h4>
                            <ul>
                                {places.map((place, index) => (
                                    <li key={index}>{place.title}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TopPlaces;
