import React from "react";
import { Box, Modal } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ItemDetailsModal({ item, onClose }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const fallbackImages = [
    "https://assets.adidas.com/images/w_1880,f_auto,q_auto/d351da228f7b4fcdbf05f9d87957597b_9366/IE8900_01_standard.jpg",
    "https://assets.adidas.com/images/w_1880,f_auto,q_auto/fbb7b38d086141968527c04c3d783b73_9366/IE8900_02_standard_hover.jpg",
    "https://assets.adidas.com/images/w_1880,f_auto,q_auto/74f21a3d5b5449a9a4a2d73241acf124_9366/IE8900_03_standard.jpg",
    "https://assets.adidas.com/images/w_1880,f_auto,q_auto/00cf60556b6b48e781d7e212dbb22b6c_9366/IE8900_04_standard.jpg",
  ];

  return (
    <Modal open={Boolean(item)} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 24,
          px: 4,
          py: 5,
          maxHeight: "85vh",
          overflowY: "auto",
          outline: "none",
          "@media (max-width: 768px)": { width: "90%", px: 3, py: 4 },
          "@media (max-width: 480px)": { width: "90%", px: 2, py: 3 },
        }}
        className="text-gray-900"
      >
        <h2 className="text-xl font-bold mb-4 text-center md:text-left">
          {item.name}
        </h2>
        <div className="mb-6">
          <Slider {...settings}>
            {item.images.map((image, index) => (
              <div
                key={index}
                className="focus:outline-none !flex !items-center !justify-center"
              >
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-auto h-60 md:h-96 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = fallbackImages[index] || fallbackImages[0];
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <p className="text-base sm:text-lg text-gray-700 mb-4 text-center sm:text-left">
          {item.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
          <p className="text-lg font-semibold">Price: LKR {item.price} /=</p>
          <p className="text-sm md:text-base text-gray-500 mt-2 sm:mt-0">
            Availability: {item.availability} in stock
          </p>
        </div>
      </Box>
    </Modal>
  );
}

export default ItemDetailsModal;
