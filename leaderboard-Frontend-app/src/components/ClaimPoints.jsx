import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ClaimPoints = ({ userId }) => {
  const { claimPoints, loading, selectedUser } = useContext(AppContext);
  const [claimedUsers, setClaimedUsers] = useState(new Set());

  const handleClaim = async () => {
    if (!selectedUser) {
      toast.error("⚠️ Please select a user first!");
      return;
    }

    const id = selectedUser._id || selectedUser.id; // fallback if _id is not used
    if (claimedUsers.has(id)) {
      toast.error(`❌ Points already claimed for ${selectedUser.username}`);
      return;
    }

    if (!id || loading) return;

    await claimPoints(id);

    setClaimedUsers((prev) => new Set(prev).add(id));
    toast.success(`🎉 ${selectedUser.username} claimed points!`);
  };

  const isAlreadyClaimed = selectedUser && claimedUsers.has(selectedUser._id || selectedUser.id);

  return (
    <button
      onClick={handleClaim}
      disabled={loading || isAlreadyClaimed}
      className={`relative w-full px-6 py-3 rounded-full text-sm sm:text-base font-bold text-white transition-all duration-300 ease-in-out shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        loading || isAlreadyClaimed
          ? "bg-gradient-to-r from-violet-400 to-indigo-400 cursor-not-allowed"
          : "bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 hover:scale-105"
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          Claiming...
        </div>
      ) : isAlreadyClaimed ? (
        <div className="text-sm">✅ Already Claimed</div>
      ) : selectedUser ? (
        <div>
          🔥 Claim Points 
        </div>
      ) : (
        "🔥 Claim Points"
      )}
    </button>
  );
};

export default ClaimPoints;
