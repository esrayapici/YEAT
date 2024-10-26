// src/components/Modal.js
import React from 'react';
import Login from './Login'; // Make sure to import your Login component

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Do not render anything if the modal is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100"> {/* Adjust z-index for the modal */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative"> {/* Make sure to set position relative for the close button */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times; {/* Close button */}
                </button>
                <Login/> {/* Render your Login component inside the modal */}
            </div>
            </div>
    );
};

export default Modal;
