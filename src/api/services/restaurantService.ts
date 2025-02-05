import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../apiClient';
import type { Restaurant, RestaurantDetail, Review } from '../types';

// 기본 엔드포인트 상수 설정 (식당 관련은 단수, ElasticSearch용은 별도 API 사용)
const RESTAURANT_API = '/api/v1/restaurant';
const RESTAURANTS_DOC_API = '/api/v1/restaurantsDoc';

// 추천 맛집: 평점순 정렬 API (ElasticSearch)
export const useRecommendedRestaurants = () => {
    return useQuery<Restaurant[], Error>('recommendedRestaurants', async () => {
        const response = await apiClient.get(
            `${RESTAURANTS_DOC_API}/sort/rate`,
        );
        return response.data.data;
    });
};

// 특정 식당 상세 조회: GET /api/v1/restaurant/{restaurant_id}
export const useRestaurantDetail = (id: number) => {
    return useQuery<RestaurantDetail, Error>(
        ['restaurantDetail', id],
        async () => {
            const response = await apiClient.get(`${RESTAURANT_API}/${id}`);
            return response.data.data;
        },
        {
            enabled: !!id,
        },
    );
};

// 식당 검색 (ElasticSearch): GET /api/v1/restaurantsDoc/search?query={query}
export const useRestaurantSearch = (query: string) => {
    return useQuery<Restaurant[], Error>(
        ['restaurantSearch', query],
        async () => {
            const response = await apiClient.get(
                `${RESTAURANTS_DOC_API}/search`,
                {
                    params: { query },
                },
            );
            return response.data.data;
        },
        {
            enabled: !!query,
            staleTime: 5 * 60 * 1000, // 5분 캐시 유지
        },
    );
};

// 즐겨찾기 맛집 조회 (즐겨찾기 엔드포인트가 존재할 경우)
export const useFavoriteRestaurants = () => {
    return useQuery<Restaurant[], Error>('favoriteRestaurants', async () => {
        const response = await apiClient.get(`${RESTAURANT_API}/favorites`);
        return response.data.data;
    });
};

// 즐겨찾기 토글: POST /api/v1/restaurant/{restaurant_id}/favorite
export const useToggleFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>(
        async (id) => {
            const response = await apiClient.post(
                `${RESTAURANT_API}/${id}/favorite`,
            );
            return response.data.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('favoriteRestaurants');
                queryClient.invalidateQueries('restaurantDetail');
            },
        },
    );
};

// 식당 리뷰 조회: GET /api/v1/restaurant/{restaurant_id}/review
export const useRestaurantReviews = (restaurantId: number) => {
    return useQuery<Review[], Error>(
        ['restaurantReviews', restaurantId],
        async () => {
            const response = await apiClient.get(
                `${RESTAURANT_API}/${restaurantId}/review`,
            );
            return response.data.data;
        },
        {
            enabled: !!restaurantId,
        },
    );
};

// 식당 리뷰 등록: POST /api/v1/restaurant/{restaurant_id}/review
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation<Review, Error, { restaurantId: number; data: FormData }>(
        async ({ restaurantId, data }) => {
            const response = await apiClient.post(
                `${RESTAURANT_API}/${restaurantId}/review`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data.data;
        },
        {
            onSuccess: (_, { restaurantId }) => {
                queryClient.invalidateQueries([
                    'restaurantReviews',
                    restaurantId,
                ]);
                queryClient.invalidateQueries([
                    'restaurantDetail',
                    restaurantId,
                ]);
            },
        },
    );
};

// 식당 리뷰 삭제: DELETE /api/v1/review/{review_id}
export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { reviewId: number; restaurantId: number }>(
        async ({ reviewId }) => {
            const response = await apiClient.delete(
                `/api/v1/review/${reviewId}`,
            );
            return response.data.data;
        },
        {
            onSuccess: (_, { restaurantId }) => {
                queryClient.invalidateQueries([
                    'restaurantReviews',
                    restaurantId,
                ]);
                queryClient.invalidateQueries([
                    'restaurantDetail',
                    restaurantId,
                ]);
            },
        },
    );
};

// 식당 리뷰 수정: PATCH /api/v1/review/{review_id}
export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation<
        Review,
        Error,
        { reviewId: number; restaurantId: number; data: FormData }
    >(
        async ({ reviewId, data }) => {
            const response = await apiClient.patch(
                `/api/v1/review/${reviewId}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data.data;
        },
        {
            onSuccess: (_, { restaurantId }) => {
                queryClient.invalidateQueries([
                    'restaurantReviews',
                    restaurantId,
                ]);
                queryClient.invalidateQueries([
                    'restaurantDetail',
                    restaurantId,
                ]);
            },
        },
    );
};

// 식당 메뉴 조회: GET /api/v1/restaurant/{restaurant_id}/menu
export const useRestaurantMenus = (restaurantId: number) => {
    return useQuery<RestaurantDetail[], Error>(
        ['restaurantMenus', restaurantId],
        async () => {
            const response = await apiClient.get(
                `${RESTAURANT_API}/${restaurantId}/menu`,
            );
            return response.data.data;
        },
        { enabled: !!restaurantId },
    );
};

// 식당 메뉴 추가: POST /api/v1/restaurant/{restaurant_id}/menu
export const useAddRestaurantMenu = () => {
    const queryClient = useQueryClient();

    return useMutation<
        RestaurantDetail,
        Error,
        { restaurantId: number; data: FormData }
    >(
        async ({ restaurantId, data }) => {
            const response = await apiClient.post(
                `${RESTAURANT_API}/${restaurantId}/menu`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data.data;
        },
        {
            onSuccess: (_, { restaurantId }) => {
                queryClient.invalidateQueries([
                    'restaurantMenus',
                    restaurantId,
                ]);
            },
        },
    );
};

// 식당 메뉴 삭제: DELETE /api/v1/menu/{menu_id}
export const useDeleteMenu = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { menuId: number; restaurantId: number }>(
        async ({ menuId }) => {
            const response = await apiClient.delete(`/api/v1/menu/${menuId}`);
            return response.data.data;
        },
        {
            onSuccess: (_, { restaurantId }) => {
                queryClient.invalidateQueries([
                    'restaurantMenus',
                    restaurantId,
                ]);
            },
        },
    );
};

// 식당 메뉴 수정: PATCH /api/v1/menu/{menu_id}
export const useUpdateMenu = () => {
    const queryClient = useQueryClient();

    return useMutation<
        RestaurantDetail,
        Error,
        { menuId: number; restaurantId: number; data: FormData }
    >(
        async ({ menuId, data }) => {
            const response = await apiClient.patch(
                `/api/v1/menu/${menuId}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data.data;
        },
        {
            onSuccess: (_, { restaurantId }) => {
                queryClient.invalidateQueries([
                    'restaurantMenus',
                    restaurantId,
                ]);
            },
        },
    );
};

// 서비스 객체: 간단 호출용 (필요 시)
export const restaurantService = {
    async getById(id: number) {
        const response = await apiClient.get(`${RESTAURANT_API}/${id}`);
        return response.data;
    },
    async getRecommended() {
        const response = await apiClient.get(
            `${RESTAURANTS_DOC_API}/sort/rate`,
        );
        return response.data;
    },
};
