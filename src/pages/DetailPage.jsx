/*global naver*/
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading"; // 로딩 컴포넌트 임포트

const DetailPage = () => {
    const [searchParams] = useSearchParams();
    const link = searchParams.get("link");
    const x = searchParams.get("x");
    const y = searchParams.get("y");
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

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

                new naver.maps.Marker({
                    position: new naver.maps.LatLng(y, x),
                    map: map
                });

                setTimeout(() => {
                    setIsLoading(false); // 최소 1초 후에 로딩 상태를 false로 설정
                }, 1000);
            };
            document.head.appendChild(script);
        }
    }, [x, y]);

    return (
        <div className="DetailPage__wrap">
            {isLoading ? (
                <div className="loading__wrap">
                    <Loading />
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default DetailPage;
