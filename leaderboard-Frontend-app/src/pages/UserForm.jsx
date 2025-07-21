import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import  toast  from "react-hot-toast";
import { avatarOptions, categories } from "../assets/assets";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showAvatarBox, setShowAvatarBox] = useState(false);
  const [selectedTempAvatar, setSelectedTempAvatar] = useState(null);
  const { createUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !category || !avatar) {
      toast.error("Please fill in all fields");
      return;
    }

    await createUser({ username, category, avatar });
    toast.success("🎉 User created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-fuchsia-100 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 relative"
      >
        {/*  Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-sm text-violet-600 hover:underline font-semibold z-20"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">🚀 Create New User</h2>

        {/* Username */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Avatar Selection */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Avatar</label>
          {!avatar && (
            <button
              type="button"
              onClick={() => setShowAvatarBox(true)}
              className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition"
            >
              Choose Avatar
            </button>
          )}
          {avatar && (
            <div className="flex items-center gap-4 mt-2">
              <img src={avatar} alt="Selected Avatar" className="w-12 h-12 rounded-full border" />
              <button
                type="button"
                onClick={() => {
                  setAvatar("");
                  setShowAvatarBox(true);
                }}
                className="text-sm text-red-500 underline"
              >
                Change
              </button>
            </div>
          )}
        </div>

        {/* Avatar Modal */}
        {showAvatarBox && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Select an Avatar</h3>
              <div className="grid grid-cols-5 gap-4 max-h-48 overflow-y-auto">
                {avatarOptions.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt="avatar"
                    className={`w-12 h-12 rounded-full border cursor-pointer transition hover:scale-105 ${
                      selectedTempAvatar === img ? "ring-2 ring-violet-500" : ""
                    }`}
                    onClick={() => setSelectedTempAvatar(img)}
                  />
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTempAvatar(null);
                    setShowAvatarBox(false);
                  }}
                  className="px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedTempAvatar) {
                      setAvatar(selectedTempAvatar);
                      setShowAvatarBox(false);
                    } else {
                      toast.warn("Please select an avatar.");
                    }
                  }}
                  className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
