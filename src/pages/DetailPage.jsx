/*global naver*/
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
    const [searchParams] = useSearchParams();
    const addresses = searchParams.get("addresses");
    const link = searchParams.get("link");
    const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (addresses) {
                const encodedAddresses = encodeURIComponent(addresses);
                const url = `http://localhost:5001/geocode?query=${encodedAddresses}`;
                try {
                    const response = await axios.get(url);
                    if (response.data.addresses && response.data.addresses.length > 0) {
                        const { x, y } = response.data.addresses[0];
                        setCoordinates({ longitude: x, latitude: y });
                    } else {
                        setError("No coordinates found for the given address");
                    }
                } catch (error) {
                    setError(error.message);
                }
            }
        };

        fetchCoordinates();
    }, [addresses]);

    useEffect(() => {
        if (coordinates.longitude && coordinates.latitude) {
            const script = document.createElement("script");
            script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_CLIENT_ID}&submodules=geocoder`;
            script.async = true;
            script.onload = () => {
                const mapOptions = {
                    center: new naver.maps.LatLng(coordinates.latitude, coordinates.longitude),
                    zoom: 17
                };
                const map = new naver.maps.Map('map', mapOptions);
            };
            document.head.appendChild(script);
        }
    }, [coordinates]);

    return (
        <div className="DetailPage__wrap">
            <div className="iframe">
                <iframe
                    src={`https://pcmap.place.naver.com/place/${link}/home`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title="Naver Map"
                ></iframe>
            </div>
            <div className="map" id="map">
                {/* 지도 영역 */}
            </div>
        </div>
    );
};

export default DetailPage;
