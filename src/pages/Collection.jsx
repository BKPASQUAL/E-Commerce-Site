import React, { useState } from "react";
import ItemCard from "../components/Collection//ItemCards";
import Navbar from "../components/common/Navbar";
import mockData from "../assets/data/mockdata";
import ItemDetailsModal from "../components/Collection/ItemDetailModal";

function Collection() {
  const [selectedItem, setSelectedItem] = useState(null);

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
        <div className="p-4 sm:p-8 md:p-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8">
          {mockData.map((item) => (
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