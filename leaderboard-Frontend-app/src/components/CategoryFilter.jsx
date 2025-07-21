import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

const CategoryFilter = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    fetchLeaderboard,
    categories,
    fetchCategories,
  } = useContext(AppContext);

  const scrollRef = useRef();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  const handleClick = (selected) => {
    setCategoryFilter(selected);
    fetchLeaderboard(selected);
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full mb-6">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-indigo-500 text-white hover:scale-110 transition-transform duration-300 shadow-lg"
      >
        <ArrowLeftCircle size={32} />
      </button>

      {/* Scrollable Category Buttons */}
      <div
        ref={scrollRef}
        className="flex justify-center overflow-x-auto no-scrollbar space-x-4 px-10"
      >
        {/* All Categories */}
        <button
          onClick={() => handleClick("")}
          className={`relative px-6 py-2 text-base font-semibold whitespace-nowrap rounded-full transition-all duration-300 ${
            categoryFilter === ""
              ? "text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 shadow-lg"
              : "text-indigo-700 bg-white hover:bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 hover:text-black"
          }`}
        >
          All Categories
        </button>

        {/* Dynamic Categories */}
        {categories?.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(cat)}
            className={`relative px-6 py-2 text-base font-semibold whitespace-nowrap rounded-full transition-all duration-300 ${
              categoryFilter === cat
                ? "text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 shadow-lg"
                : "text-indigo-700 bg-white hover:bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-indigo-500 text-white hover:scale-110 transition-transform duration-300 shadow-lg"
      >
        <ArrowRightCircle size={32} />
      </button>
    </div>
  );
};

export default CategoryFilter;
