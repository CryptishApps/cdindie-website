import { createClientComponentClient, createPagesServerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getUserSession = async() => {
    
    try {
        const supabase = createServerComponentClient({ cookies });
        const { data: { session }, error } = await supabase.auth.getSession()

        let user = session ? await supabase.from("users").select("*").eq("id", session.user.id) : null;

        return {
            user,
            session,
            error
        }
    } catch(e) {
        return {
            error: e.message,
            user: null,
            session: null
        }
    }
}

export const getUserSessionApi = async(req, res) => {
    
    try {
        const supabase = createPagesServerClient({ req, res });
        const { data: { session }, error } = await supabase.auth.getSession()

        let user = session ? await supabase.from("users").select("*").eq("id", session.user.id) : null;

        return {
            user,
            session,
            error
        }
    } catch(e) {
        return {
            error: e.message,
            user: null,
            session: null
        }
    }
}

export const emailRegister = async(email, password, location) => {

    const supabase = createClientComponentClient()

    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${location}/auth/callback`
        }
    });  
    return {
        data,
        error
    }
}

export const providerRegister = async(provider) => {

    const supabase = createClientComponentClient();

    let { data, error } = await supabase.auth.signInWithOAuth({
        provider
    });
    return {
        data,
        error
    }
}
