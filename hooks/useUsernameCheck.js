"use client"
import { useEffect, useState } from 'react';

export const useUsernameCheck = (username) => {
    
    const [checking, setChecking] = useState(false)
    const [valid, setValid] = useState(false)

    const validFormat = (u) => {
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        return usernameRegex.test(u);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (username && username.length > 3 && validFormat(username)) {
            (async() => {
                setChecking(true)
                const response = await fetch(`/api/user/check?username=${username}`, {
                    signal: signal
                });
                const res = await response.json();
                setValid(res?.exists === false);
                setChecking(false)
            })();
        } else {
            setValid(false);
            setChecking(false)
        }
        return () => {
            controller.abort?.();
        };
    }, [username])

    return { checking, valid };
};