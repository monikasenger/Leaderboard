import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { rank } from "../assets/assets";
import { GiTwoCoins } from "react-icons/gi";

const UserInfoCard = () => {
  const { leaderboard, categoryFilter } = useContext(AppContext);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    if (!Array.isArray(leaderboard)) return;

    const filtered = leaderboard
      .filter((user) => (categoryFilter ? user.category === categoryFilter : true))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setTopUsers(filtered);
  }, [leaderboard, categoryFilter]);

  if (topUsers.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No top users available{categoryFilter ? ` for ${categoryFilter}` : ""}.
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      {/* Desktop view: Rank 2 - Rank 1 - Rank 3 */}
      <div className="hidden sm:flex justify-center items-end gap-4 md:gap-6">
        {[1, 0, 2].map((index) => {
          const user = topUsers[index];
          if (!user) return null;

          const isRank1 = index === 0;

          return (
            <div
              key={user._id || `user-${index}`}
              className={`relative rounded-3xl shadow-xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-500 text-white ${
                isRank1 ? "w-64 scale-110 z-10" : "w-56"
              } pt-20 pb-6 px-4 text-center transition-transform duration-300 hover:scale-105`}
            >
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                <img
                  src={user.avatar || "https://via.placeholder.com/100"}
                  alt={user.username}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <img
                  src={rank[index]}
                  alt={`Rank ${index + 1}`}
                  className="w-12 h-12 mx-auto -mt-2 drop-shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-extrabold mt-2">{user.username}</h3>
              <p className="text-sm font-semibold mt-1 flex items-center justify-center gap-1">
                <GiTwoCoins className="text-yellow-300 text-lg" /> Points: {user.score}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile view: Rank 1 on top, Rank 2 & 3 below side-by-side */}
      <div className="sm:hidden flex flex-col items-center gap-6">
        {topUsers[0] && (
          <div className="relative rounded-2xl shadow-lg bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-500 text-white w-60 pt-16 pb-5 px-3 text-center">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <img
                src={topUsers[0].avatar || "https://via.placeholder.com/100"}
                alt={topUsers[0].username}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <img
                src={rank[0]}
                alt="Rank 1"
                className="w-10 h-10 mx-auto -mt-2 drop-shadow-lg"
              />
            </div>
            <h3 className="text-xl font-extrabold mt-2">{topUsers[0].username}</h3>
            <p className="text-sm font-semibold mt-1 flex items-center justify-center gap-1">
              <GiTwoCoins className="text-yellow-300" /> Points: {topUsers[0].score}
            </p>
          </div>
        )}

        <div className="flex justify-center gap-4">
          {[topUsers[1], topUsers[2]].map(
            (user, idx) =>
              user && (
                <div
                  key={user._id || `user-${idx + 1}`}
                  className="relative rounded-2xl shadow-lg bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-500 text-white w-40 pt-14 pb-4 px-2 text-center"
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <img
                      src={user.avatar || "https://via.placeholder.com/100"}
                      alt={user.username}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                    />
                    <img
                      src={rank[idx + 1]}
                      alt={`Rank ${idx + 2}`}
                      className="w-8 h-8 mx-auto -mt-1 drop-shadow"
                    />
                  </div>
                  <h3 className="text-sm font-bold mt-1">{user.username}</h3>
                  <p className="text-xs font-semibold mt-1 flex items-center justify-center gap-1">
                    <GiTwoCoins className="text-yellow-300" /> {user.score}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
