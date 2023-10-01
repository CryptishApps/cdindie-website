"use client";

import React, { useLayoutEffect, useState, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useWindowDimensions } from '@/hooks/useDimensions';
import { ScrollAreaCustom } from '@/components/ui/scroll-area'

interface ScrollWrapperProps extends React.PropsWithChildren {
    id: string, 
    children: any, 
    containerHeight: any, 
    extra: number | undefined, 
    className: string | undefined 
}

const ScrollWrapper = ({ id, children, containerHeight, extra, className }: ScrollWrapperProps) => {

    const ref = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const { height, isMobile } = useWindowDimensions();

    const [feedHeight, setFeedHeight] = useState<number | string>(400);

    useLayoutEffect(() => {
        if (ref?.current && !isMobile) {
            const fromTop = ref.current.getBoundingClientRect().top;
            const maxHeight = containerHeight || height-fromTop;
            setFeedHeight(containerHeight || maxHeight + (extra||0));
        } else {
            setFeedHeight('auto')
        }
    }, [ref, height, isMobile, pathname, containerHeight, id])

    return (
        <ScrollAreaCustom id={id || "feedScroll"} ref={ref} className={className || ''} style={{ height: feedHeight }}>
            {children}
        </ScrollAreaCustom>
    );
}

export default ScrollWrapper;