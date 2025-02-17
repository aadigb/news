import React from "react";

export const Card = ({ children }) => {
  return <div className="p-4 bg-white shadow-md rounded">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
