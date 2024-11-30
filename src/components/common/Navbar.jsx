import React, { useState, useEffect } from "react";
import Cart from "../../pages/Cart";

function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const toggleCart = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartOpen(open);

    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const updateCartItemCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItemCount(cartItems.length);
  };

  useEffect(() => {
    // Initialize the cart count on component mount
    updateCartItemCount();

    // Listen for the custom "cartUpdated" event
    const handleCartUpdate = () => {
      updateCartItemCount();
    };
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div className="h-16 w-full flex justify-between items-center pl-12 pr-12 shadow-md fixed bg-white">
      <div className="flex-1 text-start text-2xl font-bold text-yellow-700">
        ShoesMart
      </div>
      <div className="flex-1 flex justify-start space-x-6">
        <p className="text-red-700 font-semibold relative group cursor-pointer">
          SALE
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-700 transition-all duration-300 group-hover:w-full"></span>
        </p>
        <p className="font-semibold relative group cursor-pointer">
          MALE
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </p>
        <p className="font-semibold relative group cursor-pointer">
          WOMEN
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </p>
        <p className="font-semibold relative group cursor-pointer">
          KIDS
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </p>
        <p className="relative group cursor-pointer">
          SPORTS
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </p>
      </div>
      <div className="flex-1 flex justify-end items-center space-x-4">
        <h1 className="text-lg font-bold">Login</h1>
        <div className="relative">
          <span
            className="material-symbols-outlined text-2xl cursor-pointer"
            onClick={toggleCart(true)}
          >
            shopping_bag
          </span>
          {cartItemCount > 0 && (
            <span
              className="absolute top-0 left-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center cursor-pointer"
              onClick={toggleCart(true)}
            >
              {cartItemCount}
            </span>
          )}
        </div>
        <Cart open={cartOpen} toggleDrawer={toggleCart} />
      </div>
    </div>
  );
}

export default Navbar;
