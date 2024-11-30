import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import image from "../assets/images/adidasImg.avif";
import { Button, Divider } from "@mui/material";

function Cart({ open, toggleDrawer }) {
  const content = () => (
    <Box
      sx={{ width: 450 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    ></Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      {content()}
      <div className="p-4 pl-8 pr-8">
        <div className="flex space-x-3 items-center mb-4">
          <h1 className="text-xl font-bold">Product added to Bag</h1>
          <p className="">(2 items)</p>
        </div>
        <div className="flex justify-between">
          <img src={image} alt="Cart item image" className="h-44" />
          <div>
            <span class="material-symbols-outlined flex justify-end mb-2 text-red-800">
              delete
            </span>
            <p className="font-semibold">Ultimashow 2.0 Shoes</p>
            <p className="font-bold">SLR 15000/=</p>
            <div className="flex justify-between">
              <p className="text-sm">QTY : 3 </p>
              <div>
                <span class="material-symbols-outlined">remove</span>
                <span class="material-symbols-outlined">add</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <img src={image} alt="Cart item image" className="h-44" />
          <div>
            <span class="material-symbols-outlined flex justify-end mb-2 text-red-800">
              delete
            </span>
            <p className="font-semibold">Ultimashow 2.0 Shoes</p>
            <p className="font-bold">SLR 15000/=</p>
            <div className="flex justify-between">
              <p className="text-sm">QTY : 3 </p>
              <div>
                <span class="material-symbols-outlined">remove</span>
                <span class="material-symbols-outlined">add</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Divider className="pt-4 " />
          <div className="pt-4 flex justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-bold">SLRs 63,400</p>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#333",
              },
              mt: 2,
              width: "100%",
            }}
          >
            CheckOut
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default Cart;
