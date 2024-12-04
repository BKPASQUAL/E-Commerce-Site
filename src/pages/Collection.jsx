import React, { useState } from "react";
import ItemCard from "../components/Collection/ItemCards";
import Navbar from "../components/common/Navbar";
import mockData from "../assets/data/mockdata";
import ItemDetailsModal from "../components/Collection/ItemDetailModal";

function Collection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? item.category === filterCategory : true)
  );

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <Navbar />
      <div className="px-0 md:px-20 lg:px-28 pt-24">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-8 md:p-12">
          <select
            className="border p-2 rounded w-full sm:w-auto"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Footwear">Footwear</option>
            <option value="Running">Running</option>
          </select>
          <input
            type="text"
            placeholder="Search items..."
            className="border p-2 rounded w-full sm:w-1/4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="pl-4 pr-4 sm:pl-8 sm:pr-8 md:pl-12 md:pr-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8">
          {filteredData.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => handleOpenModal(item)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <ItemDetailsModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Collection;
