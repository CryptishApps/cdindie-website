import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import logoLight from '@/assets/images/logo_light.png';

export const Logo = () => {
    return (
        <div className="flex space-x-2 items-center">
            <Image
                src={logo.src}
                height={80}
                width={250}
                alt="cdindie logo"
                className='hidden dark:block'
            />
            <Image
                src={logoLight.src}
                height={80}
                width={250}
                alt="cdindie logo"
                className='block dark:hidden'
            />
        </div>
    );
};