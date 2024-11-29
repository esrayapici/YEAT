import React from 'react';
import Login from './Login';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative z-60">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <Login onClose={onClose} /> {/* Pass onClose explicitly */}
            </div>
        </div>
    );
};

export default Modal;
