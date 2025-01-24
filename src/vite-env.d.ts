/// <reference types="vite/client" />

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const value: string;
    export default value;
}

declare global {
    interface Window {
        kakao: any; // 필요하다면 'any' 대신 정확한 타입 정의를 추가
    }
}
const kakao: any;
