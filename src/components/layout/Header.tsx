import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import LoginModal from "../auth/LoginModal";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 mb-4 shadow-sm">
        <div className="flex items-center space-x-8">
          <Link to="/map" className="flex items-center space-x-3">
            <img src="/logo.png" alt="ComMars" className="h-10" />
            <span className="font-bold text-xl text-orange-500">ComMars</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/recommendations"
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              오늘 뭐 먹지?
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              커뮤니티
            </Link>
            <Link
              to="/reviewers"
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              인기 리뷰어
            </Link>
          </nav>
        </div>

        <button
          onClick={() => setShowLoginModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium transition-colors"
        >
          <LogIn size={20} />
          <span>로그인</span>
        </button>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Header;
