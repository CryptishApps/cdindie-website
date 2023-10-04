"use client"
import { useEffect } from 'react';

export const useSubmit = (dependencies, callback) => {
    useEffect(() => {

        const listener = (e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter")
                callback();
        };

        window.addEventListener("keydown", listener);

        return () => window.removeEventListener("keydown", listener);
    }, [...dependencies, callback])
};