import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import logoLight from '@/assets/images/logo_light.svg';

export const Logo = () => {
    return (
        <div className="flex space-x-2 items-center">
            <Image
                src={logo.src}
                height={40}
                width={120}
                alt="cdindie logo"
                className='hidden dark:block'
            />
            <Image
                src={logoLight.src}
                height={40}
                width={120}
                alt="cdindie logo"
                className='block dark:hidden'
            />
        </div>
    );
};