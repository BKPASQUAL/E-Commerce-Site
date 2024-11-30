import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

function ItemCard({ id, name, price, image, category }) {
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  const handleAddToCart = () => {
    const itemDetails = { id, name, image };

    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isItemAlreadyInCart = existingItems.some((item) => item.id === id);

    if (!isItemAlreadyInCart) {
      const updatedItems = [...existingItems, itemDetails];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      // Dispatch a custom event to update the cart count in other components
      window.dispatchEvent(new Event("cartUpdated"));

      // Show success alert
      setAlert({
        type: "success",
        message: `${name} has been added to your cart!`,
        visible: true,
      });
    } else {
      // Show warning alert
      setAlert({
        type: "warning",
        message: `${name} is already in your cart!`,
        visible: true,
      });
    }

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 3000);
  };

  return (
    <div className="w-80 h-auto bg-slate-50 rounded-xl">
      <div>
        <img
          src={image}
          alt={name}
          className="h-full object-cover rounded-xl"
        />
      </div>
      <div className="h-24 pl-4 pr-4 pt-2">
        <div className="flex justify-between w-full">
          <h1 className="font-semibold">{name}</h1>
          <p className="font-bold">SLR {price}/=</p>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="text-sm text-slate-400">{category}</p>
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={handleAddToCart}
          >
            add_circle
          </span>
        </div>
      </div>

      {/* MUI Alert positioned in the top-right corner */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Collapse in={alert.visible}>
          <Alert
            severity={alert.type}
            onClose={() => setAlert({ ...alert, visible: false })}
          >
            {alert.message}
          </Alert>
        </Collapse>
      </div>
    </div>
  );
}

export default ItemCard;
