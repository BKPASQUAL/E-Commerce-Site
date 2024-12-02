import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ItemCard({ id, name, price, image, category }) {
  const { user } = useAuth(); 
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const navigate = useNavigate();
 

  const handleAddToCart = () => {
    if (!user) {
      setAlert({
        type: "error",
        message: "You must be logged in to add items to the cart!",
        visible: true,
      });
      navigate("/login");


      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 6000);

      return; 
    }

    const itemDetails = { id, name, price, image };

    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isItemAlreadyInCart = existingItems.some((item) => item.id === id);

    if (!isItemAlreadyInCart) {
      const updatedItems = [...existingItems, itemDetails];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      window.dispatchEvent(new Event("cartUpdated"));

      setAlert({
        type: "success",
        message: `${name} has been added to your cart!`,
        visible: true,
      });
    } else {
      setAlert({
        type: "warning",
        message: `${name} is already in your cart!`,
        visible: true,
      });
    }

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

      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <Collapse in={alert.visible}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Collapse>
      </div>
    </div>
  );
}

export default ItemCard;
