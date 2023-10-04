"use client";

import React, { useLayoutEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useWindowDimensions } from '@/hooks/useDimensions';
import { ScrollAreaCustom } from '@/components/ui/scroll-area'

interface ScrollWrapperProps {
    id?: string;
    children?: React.ReactNode; 
    containerHeight?: any;
    className?: string;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children, id, containerHeight, className }) => {

    const ref = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const { height } = useWindowDimensions();

    const [feedHeight, setFeedHeight] = useState<number | string>(1000);

    useLayoutEffect(() => {
        if (ref?.current) {
            const fromTop = ref.current.getBoundingClientRect().top;
            const maxHeight = containerHeight || height-fromTop;
            console.log("containerHeight", containerHeight)
            setFeedHeight(containerHeight || maxHeight);
        } else {
            setFeedHeight('auto')
        }
    }, [ref, height, pathname, containerHeight, id])

    return (
        <ScrollAreaCustom id={id || "feedScroll"} ref={ref} className={className || ''} style={{ height: feedHeight }}>
            {children}
        </ScrollAreaCustom>
    );
}

export default ScrollWrapper;