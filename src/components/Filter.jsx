import { useState } from "react";
import { BsFilter, BsSearch } from "react-icons/bs";
function Filter({ handleShop, setFilterShop }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const tabs = [
    {
      id: 1,
      text: "All Products",
      action: null,
    },
    {
      id: 2,
      text: "Men",
      action: "men",
    },
    {
      id: 3,
      text: "Women",
      action: "women",
    },
    {
      id: 4,
      text: "Kids",
      action: "kids",
    },
  ];
  const toggleList = (index, action) => {
    setSelectedIndex(index);
    setFilterShop(action);
    handleShop();
  };
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        {/* gender adn probable categories */}
        <ul className="flex items-center space-x-5">
          {tabs.map((tab, index) => (
            <li
              onClick={() => toggleList(index, tab.action)}
              key={tab.id}
              className={
                selectedIndex === index
                  ? "cursor-pointer border-b border-gray-600 py-1"
                  : "cursor-pointer  transition-all duration-300 ease-in-out py-1 hover:border-b hover:border-gray-600"
              }
            >
              {tab.text}
            </li>
          ))}
        </ul>

        {/* filter and sorting segment */}
        <div className="space-x-2 flex items-center ">
          {/* <div className="flex items-center space-x-1 px-5 py-2 border border-gray-500 cursor-pointer rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-500 ease-in-out ">
            <BsFilter />
            <span> Filter</span>
          </div> */}
          <div
            onClick={() => setShowSearch((prevState) => !prevState)}
            className="flex items-center space-x-1 px-5 py-2 border border-gray-500 cursor-pointer rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-500 ease-in-out"
          >
            <BsSearch />
            <span> Search</span>
          </div>
        </div>
      </div>
      {/* search input */}
      {showSearch && (
        <div className="border border-gray-400 mt-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none px-7 py-3 text-gray-600"
          />
          <div className="absolute top-[50%] left-3 -translate-y-[50%]">
            <BsSearch size={10} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
