export interface ApiResponse<T = unknown> {
    status: number;
    message: string;
    data: T;
}

// Auth Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    name: string;
}

// Restaurant Types
export interface Restaurant {
    id: number;
    name: string;
    address: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    price: string;
    category: string;
}

export interface RestaurantDetail extends Restaurant {
    description: string;
    phone: string;
    businessHours: {
        open: string;
        close: string;
        breakTime?: {
            start: string;
            end: string;
        };
    };
    menu: MenuItem[];
    reviews: Review[];
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    description?: string;
}

// Review Types
export interface Review {
    id: number;
    content: string;
    rating: number;
    images?: string[];
    author: {
        id: number;
        name: string;
        profileImage?: string;
    };
    createdAt: string;
}
