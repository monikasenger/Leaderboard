import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const api = axios.create({
    baseURL: `${backendUrl}/api`,
  });

  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [categories, setCategories] = useState([]);
  const [claimHistory, setClaimHistory] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //  Register user
  const createUser = async (userData) => {
    try {
      const res = await api.post("/users/register", userData);
      toast.success("User created successfully!");
      await fetchUsers();
      await fetchLeaderboard(categoryFilter);
      return res.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create user");
    }
  };

  //  Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  //  Fetch leaderboard
  const fetchLeaderboard = async (category = "") => {
    try {
      const res = category
        ? await api.get(`/users/leaderboard/${category}`)
        : await api.get("/users/leaderboard");

      setLeaderboard(res.data);
    } catch (err) {
      toast.error("Failed to fetch leaderboard");
    }
  };

  //  Claim Points
  const claimPoints = async (userId) => {
    try {
      setLoading(true);

      const res = await api.post(`/users/claim/${userId}`);

      if (res.status === 200) {
        const { score, claimed } = res.data;

        toast.success(`+${claimed} points claimed!`);

        // Update leaderboard and history
        await fetchLeaderboard(categoryFilter);
        await getClaimHistory(userId);

        //  Directly update selectedUser with new score
        setSelectedUser((prev) => ({
          ...prev,
          score: score,
        }));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to claim points");
    } finally {
      setLoading(false);
    }
  };

  //  Fetch claim history
  const getClaimHistory = async (userId) => {
    try {
      const res = await api.get(`/users/${userId}/claims`);
      setClaimHistory((prev) => ({ ...prev, [userId]: res.data }));
    } catch (err) {
      toast.error("Failed to fetch claim history");
    }
  };

  //  Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/users/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  // Run on component mount
  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchCategories();
  }, []);

  const value = {
    backendUrl,
    users,
    leaderboard,
    claimHistory,
    loading,
    categoryFilter,
    setCategoryFilter,
    createUser,
    fetchUsers,
    fetchLeaderboard,
    claimPoints,
    getClaimHistory,
    fetchCategories,
    categories,
    selectedUser,
    setSelectedUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
