import React, { useState, useEffect } from "react";
import { getPosts } from "../../api/apiClient";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 추후 API 호출을 이용해 새 게시글을 저장할 수 있습니다.
    console.log("새 게시글:", newPost);
    setNewPost("");
    setIsWriting(false);
  };

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      {/* 메인 메뉴 및 검색 기능 */}
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-orange-500">전체</button>
          <button className="text-gray-700 hover:text-orange-500">내 글</button>
        </div>
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1"
        />
      </div>

      {/* 글 작성 영역 */}
      <div className="w-full max-w-md mb-6">
        {!isWriting ? (
          <button
            onClick={() => setIsWriting(true)}
            className="w-full bg-orange-500 text-white rounded-lg py-2"
          >
            새 게시글 작성
          </button>
        ) : (
          <form onSubmit={handlePostSubmit} className="flex flex-col">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={4}
              className="border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="글 내용을 입력하세요"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-lg p-2 w-full hover:bg-orange-600 transition-colors"
            >
              게시글 작성
            </button>
          </form>
        )}
      </div>

      {/* 게시글 목록 */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <div className="flex flex-col w-full max-w-md mb-16">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200 mb-4"
            >
              <div className="p-4 flex-1">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {post.author} | {post.date}
                </p>
              </div>
              <div className="p-4 border-t border-gray-200 text-right">
                <button className="text-orange-500 hover:underline">
                  댓글 달기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
