// Modal.jsx
import React from "react";
import ReactModal from "react-modal";

const Modal = ({ isOpen, onRequestClose, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Details"
            className="max-w-lg mx-auto rounded shadow-lg bg-white p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <button className="absolute top-2 right-2 text-gray-500" onClick={onRequestClose}>
                &times;
            </button>
            {children}
        </ReactModal>
    );
};

export default Modal;