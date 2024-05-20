// ReusableModal.js
import React from "react";

const ReusableModal = ({ id, title, children }) => {
  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Title`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Title`}>{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
