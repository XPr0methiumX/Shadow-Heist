import React from 'react'

export const Crosshair = () => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white rounded-full flex justify-center items-center"
    >
      <div className="w-1 h-1 bg-white rounded-full" />
      <div className="w-0.5 h-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="w-4 h-0.5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}