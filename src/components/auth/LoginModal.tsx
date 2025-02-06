import { X } from 'lucide-react';
import { AuthGoogle, AuthNaver } from '../../api';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store/Store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const user = useSelector((state: RootState) => state.user);

    if (!isOpen || user.isLoggedIn) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[400px] relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                    aria-label="닫기"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src="/logo.png"
                            alt="ComMars"
                            className="h-16 mb-2"
                        />
                        <span className="font-bold text-xl text-orange-500">
                            ComMars
                        </span>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={AuthNaver()}
                            className="w-full py-3 px-4 rounded-md bg-[#FEE500] text-black font-medium flex items-center justify-center space-x-2 hover:bg-[#FDD800] transition-colors"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    fill="#000000"
                                    d="M12 3C6.48 3 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm4.89 11.9l-1.44-2.65v.01l-.03-.01L13 14.99V9h-2v5.99l-2.42-2.74-.03.01v-.01L7.11 14.9c-.42.77.22 1.68 1.09 1.54l3.8-.67 3.8.67c.87.14 1.51-.77 1.09-1.54z"
                                />
                            </svg>
                            <span>카카오로 시작하기</span>
                        </button>

                        {/* <button className="w-full py-3 px-4 rounded-md bg-white border border-gray-300 text-black font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg> */}
                        <GoogleOAuthProvider clientId={googleClientId}>
                            <GoogleLogin onSuccess={AuthGoogle()} />
                        </GoogleOAuthProvider>
                        {/* <span>Google로 시작하기</span>
                        </button> */}
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        로그인함으로써 Commars의{' '}
                        <a href="#" className="text-orange-500 hover:underline">
                            이용약관
                        </a>
                        과{' '}
                        <a href="#" className="text-orange-500 hover:underline">
                            개인정보처리방침
                        </a>
                        에 동의합니다
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
