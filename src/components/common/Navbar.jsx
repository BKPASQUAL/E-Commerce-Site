import React from "react";

function Navbar() {
  return (
    <div className="h-16 w-full flex justify-between items-center pl-12 pr-12 shadow-md">
      <div className="flex-1 text-start text-2xl font-bold text-yellow-700">
        ClouthingMart
      </div>
      {/* <div className="flex-1 text-center">dcb cdhehbci</div> */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        <h1 className="text-lg">Login</h1>
        <span className="material-symbols-outlined text-2xl">shopping_bag</span>
      </div>
    </div>
  );
}

export default Navbar;
