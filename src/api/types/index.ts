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

// ✅ Board (게시글) 타입 추가
export interface Board {
    id: number; // 기존 id 필드 유지
    boardId?: number; // 백엔드에서 넘어오는 boardId를 추가
    title: string;
    content: string;
    user: {
        id: number;
        name: string;
        profileImage?: string;
    };
    hashTags: string[];
    viewCnt: number;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
}


// ✅ Comment (댓글) 타입 추가
// ✅ Comment (댓글) 타입 수정
export interface Comment {
    commentId: number;  // <-- id → commentId 변경
    content: string;
    user: {
      userId: number;   // <-- id → userId 변경
      name: string;
      profileImage?: string;
    };
    createdAt: string;
    replies?: Reply[];  // ✅ 대댓글 배열 추가
  }
  
  
  export interface Reply {
    replyId: number;
    content: string;
    userId: number;
    username: string;
    createdAt: string;
}
