"use client"
import React, { createContext, useEffect, useMemo, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from '@/components/ui/use-toast';

export const AuthContext = createContext({
    user: null,
    token: null
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ 
    children,
    sessionUser
}) => {

    const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });

    const router = useRouter();
    const { toast } = useToast();

    const [user, setUser] = useState(sessionUser);

    const newSessionUser = useMemo(() => {
        return sessionUser
    }, [sessionUser])

    useEffect(() => {
        setUser(newSessionUser || null);
    }, [setUser, newSessionUser])

    const signOut = async() => {
        await supabase.auth.signOut();
        toast({
            variant: 'success',
            title: 'Signed out'
        })
        router.refresh();
    }

    return (
        
        <AuthContext.Provider value={{ 
            user,
            setUser,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};