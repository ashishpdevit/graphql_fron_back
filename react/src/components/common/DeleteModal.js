import React from 'react';
import Modal from 'react-modal';
import './deletemodal.css';

const DeleteModal = ({ isOpen, onRequestClose, onDelete, moduleName, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Confirmation"
        >
            <h2>Delete {moduleName}</h2>
            <p>Are you sure you want to delete this {moduleName}?</p>
            <button onClick={onDelete}>Yes</button>
            <button onClick={onRequestClose}>Cancel</button>
        </Modal>
    );
};

export default DeleteModal;