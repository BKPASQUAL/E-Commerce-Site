import React from "react";
import ItemCard from "../components/Collection/ItemCard";
import Navbar from "../components/common/Navbar";
import mockData from "../assets/data/mockdata";

function Collection() {
  const visibleItems = mockData; 

  return (
    <>
      <Navbar />
      <div className="pl-20 pr-20 pt-24">
        <div className="p-12 grid grid-cols-4 gap-x-32 gap-y-8">
          {visibleItems.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Collection;
