// /* global kakao */
// import { useState, useEffect } from 'react';

// const { kakao } = window;

// interface UseKakaoMapReturn {
//     map: kakao.maps.Map | null;
//     userLocation: kakao.maps.LatLng | null;
// }

// const useKakaoMap = (mapContainerId: string): UseKakaoMapReturn => {
//     const [map, setMap] = useState<kakao.maps.Map | null>(null);
//     const [userLocation, setUserLocation] = useState<kakao.maps.LatLng | null>(
//         null,
//     );

//     useEffect(() => {
//         const loadScript = (src: string): Promise<void> => {
//             return new Promise((resolve, reject) => {
//                 const script = document.createElement('script');
//                 script.src = src;
//                 script.async = true;

//                 script.onload = () => resolve();
//                 script.onerror = () =>
//                     reject(new Error(`Failed to load script: ${src}`));

//                 document.head.appendChild(script);
//             });
//         };

//         const initMap = async () => {
//             try {
//                 await loadScript(
//                     'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c7958a7c0d07a3b72a7fee938b0703d8&libraries=services',
//                 );

//                 const kakao = window.kakao;
//                 kakao.maps.load(() => {
//                     const mapContainer = document.getElementById(
//                         mapContainerId,
//                     ) as HTMLElement;
//                     const options = {
//                         center: new kakao.maps.LatLng(37.566826, 126.9786567),
//                         level: 3,
//                     };
//                     const newMap = new kakao.maps.Map(mapContainer, options);
//                     setMap(newMap);

//                     if (navigator.geolocation) {
//                         navigator.geolocation.getCurrentPosition(
//                             (position) => {
//                                 const lat = position.coords.latitude;
//                                 const lon = position.coords.longitude;

//                                 const userLatLng = new kakao.maps.LatLng(
//                                     lat,
//                                     lon,
//                                 );
//                                 setUserLocation(userLatLng);

//                                 const userMarker = new kakao.maps.Marker({
//                                     position: userLatLng,
//                                     title: '내 위치',
//                                 });
//                                 userMarker.setMap(newMap);
//                                 newMap.setCenter(userLatLng);
//                             },
//                             (error) => {
//                                 console.error(error);
//                                 alert('사용자 위치를 가져올 수 없습니다.');
//                             },
//                         );
//                     } else {
//                         alert('이 브라우저는 Geolocation을 지원하지 않습니다.');
//                     }
//                 });
//             } catch (error) {
//                 console.error('Failed to load Kakao Maps API:', error);
//                 alert('지도 로드에 실패했습니다. API 키를 확인하세요.');
//             }
//         };

//         initMap();
//     }, [mapContainerId]);

//     return { map, userLocation };
// };

// export default useKakaoMap;
