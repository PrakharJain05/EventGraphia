import React from "react";

export const Image = ({ imageNumber }) => {
  return (
    <img
      src={`http://via.placeholder.com/200x200?text=${imageNumber}`}
      alt={imageNumber}
    />
  );
};
