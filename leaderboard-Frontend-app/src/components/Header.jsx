import { Link } from "react-router-dom";
import { UserPlus2 } from "lucide-react";

const Header = () => {
  return (
    <header className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-500 shadow-xl text-white flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 transition-all duration-300 w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-md text-center sm:text-left">
        🚀 Leaderboard Dashboard
      </h1>

      <Link to="/create-user" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold px-4 sm:px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
          <UserPlus2 size={20} strokeWidth={2} />
          <span className="text-sm sm:text-base">Add New User</span>
        </button>
      </Link>
    </header>
  );
};


export default Header;
