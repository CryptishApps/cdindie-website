"use client"

import React from 'react';
import { useComponents } from '@/providers/ComponentProvider';
import ModalContainer from './ModalContainer';

const ConfirmModal = ({ loading }) => {

    const { confirmTitle, confirmText, handleConfirmOk, handleConfirmCancel } = useComponents();

    return (
        <ModalContainer
            closeModal={handleConfirmCancel}
            title={confirmTitle}
            confirmText="Confirm"
            sizeClass='max-w-md'
            confirm={handleConfirmOk}
            loading={loading}
        >
            <p>{confirmText}</p>
        </ModalContainer>
    );
};

export default ConfirmModal;