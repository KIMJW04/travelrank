/*global naver*/
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DetailPage = () => {
    const [searchParams] = useSearchParams();
    const link = searchParams.get("link");
    const x = searchParams.get("x");
    const y = searchParams.get("y");

    useEffect(() => {
        if (x && y) {
            const script = document.createElement("script");
            script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_CLIENT_ID}&submodules=geocoder`;
            script.async = true;
            script.onload = () => {
                const mapOptions = {
                    center: new naver.maps.LatLng(y, x),
                    zoom: 17
                };
                const map = new naver.maps.Map('map', mapOptions);

                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(y, x),
                    map: map
                });
            };
            document.head.appendChild(script);
        }
    }, [x, y]);

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
