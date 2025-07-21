import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Move here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<UserForm />} />
      </Routes>
    </>
  );
};

export default App;
