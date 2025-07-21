import { useContext } from "react";
import Header from "../components/Header";
import UserInfoCard from "../components/UserInfoCard";
import CategoryFilter from "../components/CategoryFilter";
import UserList from "../components/UserList";
import ClaimPoints from "../components/ClaimPoints";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { selectedUser } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-fuchsia-100 to-indigo-100 px-4 py-10 font-sans text-gray-900">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
      </div>

      <div className="w-full max-w-7xl mx-auto mt-12 space-y-10">
        <div className="rounded-xl p-6 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-indigo-50 shadow-xl border border-white/20 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
          <CategoryFilter />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <UserInfoCard />
          </div>
        </div>

        <UserList />
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <ClaimPoints userId={selectedUser?._id} selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Home;
