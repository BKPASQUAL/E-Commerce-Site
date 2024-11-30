import React from "react";

function ItemCard({ name, price, image, category }) {
  return (
    <div className="w-80 h-auto bg-slate-50 rounded-xl">
      <div>
        <img src={image} alt={name} className="h-full object-cover rounded-xl" />
      </div>

      <div className="h-24 pl-4 pr-4 pt-2">
        <div className="flex justify-between w-full">
          <h1 className="font-semibold">{name}</h1>
          <p className="font-bold">SLR {price}/=</p>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="text-sm text-slate-400">{category}</p>
          <span className="material-symbols-outlined cursor-pointer ">
            add_circle
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
