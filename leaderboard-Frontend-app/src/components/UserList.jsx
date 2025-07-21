import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { GiTwoCoins } from "react-icons/gi";

const UserList = () => {
  const { leaderboard, categoryFilter, selectedUser, setSelectedUser } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(5); // Initially show 5 users

  const filteredLeaderboard = Array.isArray(leaderboard)
    ? leaderboard.filter((user) => (categoryFilter ? user.category === categoryFilter : true))
    : [];

  const visibleUsers = filteredLeaderboard.slice(0, visibleCount);

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6 max-w-3xl w-full mx-auto mt-10">
      <h2 className="text-4xl font-extrabold mb-6 text-center drop-shadow-md">
        <span className="text-4xl">🏆</span>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500">
          {categoryFilter ? `${categoryFilter} Users` : "Leaderboard"}
        </span>
      </h2>

      {visibleUsers.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No users found{categoryFilter ? ` for ${categoryFilter}` : ""}.
        </p>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {visibleUsers.map((user, index) => {
              const isSelected = selectedUser?._id === user._id;

              return (
                <li
                  key={user._id || `user-${index}`}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-between gap-4 p-4 md:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-violet-100 via-fuchsia-100 to-indigo-100 border-fuchsia-300 shadow-lg"
                      : "hover:bg-gradient-to-r hover:from-violet-50 hover:to-indigo-50 border-gray-200"
                  }`}
                >
                  <div className="text-lg md:text-xl font-semibold text-gray-700 w-8 text-right">{index + 1}.</div>

                  <img
                    src={user.avatar || "https://via.placeholder.com/100"}
                    alt={user.username}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                  />

                  <div className="flex-1 flex flex-col">
                    <span className="text-gray-900 font-bold text-lg md:text-xl">{user.username}</span>
                    <span className="text-sm text-gray-500">{user.category}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    <GiTwoCoins className="text-yellow-300" />
                    {user.score} pts
                  </div>
                </li>
              );
            })}
          </ul>

          {visibleCount < filteredLeaderboard.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="px-6 py-2 text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-full font-semibold transition-all duration-300 shadow-lg"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
