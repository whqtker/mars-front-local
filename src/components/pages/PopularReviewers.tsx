import { useState, useEffect } from "react";
import { getPopularReviewers } from "../../api/apiClient";

export interface Reviewer {
  rank: number;
  name: string;
  score: number;
  image: string;
}

const PopularReviewers = () => {
  const [topReviewers, setTopReviewers] = useState<Reviewer[]>([]);
  const [otherReviewers, setOtherReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviewers() {
      try {
        const data = await getPopularReviewers();
        // 백엔드에서 top, others 객체로 응답한다고 가정
        setTopReviewers(data.top);
        setOtherReviewers(data.others);
      } catch (err) {
        console.error(err);
        setError("리뷰어 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchReviewers();
  }, []);

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex-1 mx-4 p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-8 text-center">
        이달의 베스트 리뷰어를 만나보세요!
      </h1>

      {/* Top Reviewers Section */}
      <div className="flex justify-around mb-6">
        {topReviewers.map((reviewer) => (
          <div
            key={reviewer.rank}
            className="relative w-32 h-32 bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col items-center justify-end shadow-lg"
          >
            <div className="w-full h-16 flex items-center justify-center">
              <img
                src={reviewer.image}
                alt={reviewer.name}
                className="w-20 h-20 object-cover"
              />
            </div>
            <div className="bg-white w-full h-16 flex flex-col items-center justify-center">
              <span className="font-semibold">{reviewer.name}</span>
              <span className="text-gray-500">
                점수: {reviewer.score.toFixed(2)}
              </span>
            </div>
            {/* Crown icon 표시: rank 1, 2, 3인 경우 */}
            {reviewer.rank <= 3 && (
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <span className="text-3xl font-bold -mt-6">👑</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Other Reviewers Section */}
      <div className="space-y-2">
        {otherReviewers.map((reviewer) => (
          <div
            key={reviewer.name}
            className="flex items-center p-2 border-b border-gray-200"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
              <img
                src={reviewer.image}
                alt={reviewer.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="flex-1">{reviewer.name}</span>
            <span>{reviewer.score.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularReviewers;
