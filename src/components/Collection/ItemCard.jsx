import React from "react";
import image from "../../assets/image/adidasImg.avif";

function ItemCard() {
  return (
    <div className="w-80 h-auto bg-slate-50">
      <div>
        <img src={image} alt="dummy img" className="h-full object-cover" />
      </div>

      <div className="h-24 pl-4 pr-4 pt-2">
        <div className="flex justify-between w-full">
          <h1 className="font-semibold">Ultimashow 2.0 Shoes</h1>
          <p className="font-bold">SLR 15000/=</p>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="text-sm text-slate-400">Runnning</p>
          <span class="material-symbols-outlined ">add_circle</span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
