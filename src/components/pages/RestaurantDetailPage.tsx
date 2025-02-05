import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { restaurantService } from "../../api/services/restaurantService";
import type { RestaurantDetail } from "../../types";

export default function RestaurantDetailPage() {
  const { restaurant_id } = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const response = await restaurantService.getById(Number(restaurant_id));
        console.log(response); // 응답 확인
        if (response.data) {
          setRestaurant(response.data);
        } else {
          setError("API에서 식당 정보를 받아오지 못했습니다.");
        }
      } catch (err) {
        console.error("Error fetching restaurant data:", err); // 오류 출력
        setError("식당 정보를 가져오는 도중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    if (restaurant_id) {
      fetchRestaurant();
    }
  }, [restaurant_id]);

  if (loading) {
    return <div>불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!restaurant) {
    return <div>식당 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>주소: {restaurant.address}</p>
      <p>전화번호: {restaurant.phone}</p>
      {restaurant.businessHours && (
        <div>
          <p>
            영업시간: {restaurant.businessHours.open} -{" "}
            {restaurant.businessHours.close}
          </p>
          {restaurant.businessHours.breakTime && (
            <p>
              휴식시간: {restaurant.businessHours.breakTime.start} -{" "}
              {restaurant.businessHours.breakTime.end}
            </p>
          )}
        </div>
      )}
      {restaurant.menu && restaurant.menu.length > 0 && (
        <div>
          <h2>메뉴</h2>
          <ul>
            {restaurant.menu.map((menu) => (
              <li key={menu.id}>
                {menu.name} - {menu.price}원
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
