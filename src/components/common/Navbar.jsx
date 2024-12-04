import React, { useState, useEffect } from "react";
import Cart from "../../pages/Cart";

function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
    updateCartItemCount();

    const handleCartUpdate = () => {
      updateCartItemCount();
    };
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <nav className="h-16 w-full shadow-md fixed bg-white z-50">
      <div className="flex justify-between items-center px-4 h-full lg:px-12">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-700">ShoesMart</div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {["SALE", "MALE", "WOMEN", "KIDS", "SPORTS"].map((link) => (
            <p
              key={link}
              className="font-semibold relative group cursor-pointer"
            >
              {link}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </p>
          ))}
        </div>

        <div className="flex space-x-6">
          {/* Cart and Login */}
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold hidden lg:block">Login</h1>
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
          

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl focus:outline-none transition duration-300 ease-in-out"
            >
              <span
                className={`material-symbols-outlined text-blue-500 font-semibold transform transition-transform duration-300 ${
                  menuOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {menuOpen ? "close" : "density_medium"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="text-white text-2xl space-y-6 list-none text-center">
          {["SALE", "MALE", "WOMEN", "KIDS", "SPORTS"].map((link) => (
            <p
              key={link}
              className="cursor-pointer hover:text-pnk transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </p>
          ))}
          <h1
            className="text-lg font-bold cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;