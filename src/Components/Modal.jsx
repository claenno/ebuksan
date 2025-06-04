// frontend/src/Components/Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                <button onClick={onClose} className="absolute top-2 right-2 text-black">X</button>
                {children}
        </div>
    );
};

export default Modal;