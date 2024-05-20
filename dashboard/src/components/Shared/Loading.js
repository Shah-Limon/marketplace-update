import React from "react";

const Loading = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
