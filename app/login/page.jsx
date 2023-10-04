import React from 'react';
import LoginForm from './login-form';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/supabase/session';
import LoginImage from '@/app/login/login-image';

export const dynamic = 'force-dynamic'

const LoginPage = async({ searchParams }) => {

    const { user } = await getUserSession();

    if (user) {
        redirect("/account");
    }

    return (
        <div className='h-page flex-col items-center justify-center grid grid-cols-1 lg:max-w-none lg:grid-cols-2 lg:px-0 w-full overflow-x-hidden'>
            <LoginImage />
            <LoginForm queryError={searchParams?.error} />
        </div>
    );
};

export default LoginPage;