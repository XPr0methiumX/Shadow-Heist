import React from "react";

export const Crosshair = () => {
  return (
    <div id="crosshair" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Vertical Line - Top */}
      <div className="absolute w-1 h-2 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-2" /> 
      {/* Vertical Line - Bottom */}
      <div className="absolute w-1 h-2 bg-white top-1/2 left-1/2 -translate-x-1/2 translate-y-2" /> 

      {/* Horizontal Line - Left */}
      <div className="absolute w-2 h-1 bg-white top-1/2 left-1/2 -translate-x-3" /> 
      {/* Horizontal Line - Right */}
      <div className="absolute w-2 h-1 bg-white top-1/2 left-1/2 translate-x-1" /> 
    </div>
  )
}