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
                const url = `/api/geocode?query=${encodedAddresses}`;

                console.log(`Request URL: ${url}`); // 요청 URL을 콘솔에 출력합니다.

                try {
                    const response = await axios.get(url);
                    console.log('Response:', response);
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
            <div className="map">
                <h2>{addresses}</h2>
                <p>Place ID: {link}</p>
                {coordinates.longitude && coordinates.latitude ? (
                    <p>Coordinates: {coordinates.latitude}, {coordinates.longitude}</p>
                ) : (
                    <p>Loading coordinates...</p>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default DetailPage;
