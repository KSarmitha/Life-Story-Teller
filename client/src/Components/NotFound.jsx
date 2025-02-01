import React from "react";

export const NotFound = () => {
  const img = {
    width: "400px",
    height: "auto",
    marginBottom: "20px",
  };
  return (
    <div className="center p-2">
      <img src="not-found.svg" alt="Not Found" style={img} />
      <h2 className="sub-heading">Oops! Page not found.</h2>
    </div>
  );
};
