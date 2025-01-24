import React, { useEffect } from 'react';

const { kakao } = window as any;

interface MapComponentProps {
    lat: number;
    lng: number;
}

function MapComponent({ lat, lng }: MapComponentProps) {
    useEffect(() => {
        if (lat && lng) {
            const mapContainer = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3,
            };
            const map = new kakao.maps.Map(mapContainer, options);
            new kakao.maps.Marker({ position: map.getCenter(), map: map });
        }
    }, [lat, lng]);

    return <div id="map" style={{ width: '1000%', height: '1000px' }} />;
}

export default MapComponent;
