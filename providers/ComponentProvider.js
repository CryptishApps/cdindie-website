"use client";

import React, { createContext, useEffect, useRef, useState, useContext } from 'react';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { usePathname } from 'next/navigation';

export const ComponentContext = createContext();

export const useComponents = () => {
    return useContext(ComponentContext);
}

export const ComponentProvider = ({ children }) => {

    const resolver = useRef();
    const pathname = usePathname();

    const [confirmModal, setConfirmModal] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState('Confirm Action');
    const [confirmText, setConfirmText] = useState('Are you sure you want to continue?')
    const [confirming, setConfirming] = useState(false)
    const [adminModals, setAdminModals] = useState({
        addGame: false,
        addStudio: false,
        addContent: false,
        addVideoGallery: false,
        addYoutube: false,
        addTwitter: false,
        editUser: false
    });
    const [showBack, setShowBack] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false);

    const disableSplashScreen = () => {
        const splashScreen = document.getElementById('splash-screen')
        if (splashScreen) {
            splashScreen.classList.add("hidden");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            disableSplashScreen()
        }, 0) //1500
    }, [])

    useEffect(() => {
        setShowBack(false)
    }, [pathname])

    const showConfirm = (title, text) => {
        setConfirmTitle(title)
        setConfirmText(text)
        setConfirmModal(true)
        return new Promise(function (resolve) {
            resolver.current = resolve;
            setConfirming(false)
        });
    };

    const handleConfirmOk = () => {
        resolver.current && resolver.current(true);
        setConfirming(true)
        setConfirmModal(false);
    };

    const handleConfirmCancel = () => {
        resolver.current && resolver.current(false);
        setConfirmModal(false)
    };

    return (
        <ComponentContext.Provider value={{
            confirmModal,
            confirmTitle,
            confirmText,
            setConfirmModal,
            handleConfirmCancel,
            handleConfirmOk,
            showConfirm,
            confirming,
            setConfirming,
            adminModals,
            setAdminModals,
            setShowBack,
            showBack,
            showNewPost,
            setShowNewPost
        }}>
            {children}
            {confirmModal && <ConfirmModal loading={confirming}/>}
        </ComponentContext.Provider>
    );
};