import React from "react";

const Loading = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center blog-page-area pd-top-100 pd-bottom-100">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
