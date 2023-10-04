"use client"

import React from 'react';
import { motion } from 'framer-motion';
import loginImg from '@/assets/images/pages/login2.webp'

const LoginImage = () => {
    return (
        <motion.div 
            key="imgcontainer" 
            className="relative h-full flex-col bg-muted p-10 text-white flex"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute inset-0 bg-zinc-900 bg-cover bg-center" style={{ backgroundImage: `url(${loginImg.src})`}} />

            <div className="absolute inset-0 bg-image-fade dark:bg-image-fade-dark"/>
            {/* <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-md font-bold text-foreground">
                        &ldquo;Monsters became a bit of a theme when putting this all together. Just go with it.
                        &rdquo;
                    </p>
                    <footer className="text-sm text-foreground">Andy Lower</footer>
                </blockquote>
            </div> */}
        </motion.div>
    );
};

export default LoginImage;