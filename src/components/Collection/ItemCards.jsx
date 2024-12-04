import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ItemCards({ item, onClick }) {
  const { user } = useAuth();
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to add items to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me in!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else {
          setAlert({
            type: "info",
            message: "Action canceled.",
            visible: true,
          });
          setTimeout(() => {
            setAlert({ ...alert, visible: false });
          }, 3000);
        }
      });

      return;
    }

    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = existingItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndex === -1) {
      const updatedItems = [...existingItems, { ...item, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      setAlert({
        type: "success",
        message: `${item.name} has been added to your cart!`,
        visible: true,
      });
    } else {
      setAlert({
        type: "warning",
        message: `${item.name} is already in your cart!`,
        visible: true,
      });
    }

    window.dispatchEvent(new Event("cartUpdated"));
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
  };

  return (
    <div
      className=" md:w-full  bg-slate-50 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="w-full md:h-64 overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) =>
            (e.target.src =
              "https://assets.adidas.com/images/w_940,f_auto,q_auto/d351da228f7b4fcdbf05f9d87957597b_9366/IE8900_01_standard.jpg")
          }
        />
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-left">
          <h1 className="font-semibold md:text-lg truncate">
            {item.name}
          </h1>
          <p className="font-medium md:font-bold md:text-lg">LKR {item.price}/=</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-slate-400">{item.category} Shoes</p>
          <span
            className="material-symbols-outlined cursor-pointer text-xl sm:text-2xl text-blue-600 hover:text-blue-800 transition"
            onClick={(e) => {
              e.stopPropagation(); 
              handleAddToCart();
            }}
          >
            add_circle
          </span>
        </div>
      </div>

      {/* Alert Section */}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4 sm:px-0">
        <Collapse in={alert.visible}>
          <Alert
            severity={alert.type}
            onClose={() => setAlert({ ...alert, visible: false })}
            className="shadow-lg"
          >
            {alert.message}
          </Alert>
        </Collapse>
      </div>
    </div>
  );
}

export default ItemCards;