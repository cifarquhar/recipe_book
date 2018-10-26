import React from "react";

const Modal = ({ show, handleClose, handleDelete, children }) => {

  const visibilityClass = show ? "modal display-block" : "modal display-none";

  return (
    <div className={visibilityClass}>
      <section className="modal-main">
        <section className="modal-header">
          {children.slice(0, 1)}
        </section>
        <section className="modal-content">
          {children.slice(1)}
        </section>
        <section className="modal-footer">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleDelete}>Delete</button>
        </section>
      </section>
    </div>
  )

}

export default Modal;