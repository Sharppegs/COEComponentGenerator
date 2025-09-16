import React from "react";


export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
        <h2 className="text-2xl text-center mt-3">Loading...</h2>
    
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    </div>
  );
}