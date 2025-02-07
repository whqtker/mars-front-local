import { X } from "lucide-react";
import { AuthGoogle, AuthNaver } from "../../api";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store/Store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
            <img src="/logo.png" alt="ComMars" className="h-16 mb-2" />
            <span className="font-bold text-xl text-orange-500">ComMars</span>
          </div>

          <div className="space-y-4">
            <button
              onClick={AuthNaver()}
              className="w-full py-3 px-4 rounded-md bg-[#03C75A] text-white font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M18 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V2C20 0.9 19.1 0 18 0ZM14.86 14.04H11.91V7.47L8.07 14.04H5.14V5.96H8.09V12.53L11.93 5.96H14.86V14.04Z"
                  fill="white"
                />
              </svg>
              <span>네이버로 시작하기</span>
            </button>

            <div className="h-10">
              <GoogleOAuthProvider clientId={googleClientId}>
                <GoogleLogin
                  onSuccess={AuthGoogle()}
                  type="standard"
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  locale="ko"
                  width="335"
                />
              </GoogleOAuthProvider>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            로그인함으로써 Commars의{" "}
            <a href="#" className="text-orange-500 hover:underline">
              이용약관
            </a>
            과{" "}
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
