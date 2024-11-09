import React from "react";
import not_found from "../assets/images/not_found.jpg";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <img src={not_found} className="w-full h-fit" />
    </div>
  );
}
