import React from "react";

const Logo = ({ logoSrc, altText = "Die Drei Zahnärzte Logo", className }) => {
  return (
    <img
      src={logoSrc}
      alt={altText}
      className={`transition-transform duration-1000 ease-in-out hover:scale-110 ${className}`}
    />
  );
};

export default Logo;
