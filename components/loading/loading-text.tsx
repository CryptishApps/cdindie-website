import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

export const LoadingText = (props: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span {...props} className={cn(props.className, "animate-typing overflow-hidden whitespace-nowrap")}>{props.children} <span className='animate-blink'>_</span></span>
    );
};