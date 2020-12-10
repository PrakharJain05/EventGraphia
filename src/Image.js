import React from "react";

export const Image = ({ imageNumber }) => {
  return (
    <img
      src={`https://via.placeholder.com/200x200?text=${imageNumber}`}
      alt={imageNumber}
    />
  );
};
