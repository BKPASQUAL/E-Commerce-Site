import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, Divider, IconButton } from "@mui/material";
import empty from "../assets/images/empty.svg"; 

function Cart({ open, toggleDrawer }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, [open]);

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleQuantityChange = (id, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: { xs: "80%", sm: 400, md: 450 },
        },
      }}
    >
      <Box sx={{ p: 4 }}>
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          {cartItems.length > 0 ? `Cart (0${cartItems.length} items)` : "Cart"}
        </h1>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col sm:flex-row justify-between items-center mb-4 bg-slate-100/50 p-3 rounded-lg"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-24 w-24 object-cover rounded"
                onError={(e) =>
                  (e.target.src =
                    "https://assets.adidas.com/images/w_940,f_auto,q_auto/d351da228f7b4fcdbf05f9d87957597b_9366/IE8900_01_standard.jpg")
                }
              />

              <div className="flex-1 ml-0 sm:ml-4 text-center sm:text-left mt-3 sm:mt-0">
                <h2 className="font-semibold text-base">{item.name}</h2>
                <p className="font-bold text-sm mt-1">
                  LKR {item.price * item.quantity} /=
                </p>

                <div className="flex justify-center sm:justify-between items-center mt-2 space-x-2 sm:space-x-0">
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <div className="flex items-center space-x-2">
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, -1)}
                      size="small"
                      sx={{ padding: "5px" }}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </IconButton>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, 1)}
                      size="small"
                      sx={{ padding: "5px" }}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </IconButton>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="md:hidden text-red-600 flex items-center justify-center absolute top-2 right-2"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="hidden text-red-600 md:flex items-center justify-center mt-3 sm:mt-0 absolute top-2 right-2"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={empty}
              alt="Empty Cart"
              className="w-48 h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              variant="contained"
              onClick={toggleDrawer(false)}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                fontWeight: "bold",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Continue Shopping
            </Button>
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <Divider className="my-4" />
            <div className="flex justify-between text-center mt-5 sm:text-left">
              <p className="font-semibold">Total</p>
              <p className="font-bold">LKR {getTotalPrice()} /=</p>
            </div>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                fontWeight: "bold",
                width: "100%",
                marginTop: "16px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Check Out
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default Cart;