import React, { ElementType, HTMLAttributes } from "react";
import { motion, MotionProps } from "motion/react";

export default function MotionView({ isDesktop, children, htmlTag, htmlProps, viewport, delay = 0, normal }: {
    isDesktop?: boolean | null
    children?: React.ReactNode
    htmlTag: 'div' | 'p' | 'main' | 'span' | 'nav' | 'hr' | 'footer' | 'section'
    htmlProps?: HTMLAttributes<HTMLElement> & { [key: `data-${string}`]: string | number | boolean | undefined }
    normal?: boolean
    delay?: number
    viewport?: {  once: boolean, amount: number  }
}) {
    if (isDesktop === null) {
        return <></>
    } 

    if (isDesktop) {
        if (normal) {
            return React.createElement(htmlTag, htmlProps, children);
        }

        const defaultMotionProps: MotionProps = {
            initial: { opacity: 0, y: 80 }, 
            transition: { type: "spring", stiffness: 80, damping: 30, mass: 1, delay }
        }

        if (viewport) {
            defaultMotionProps.whileInView = { opacity: 1, y: 0 }
            defaultMotionProps.viewport = viewport
        } else {
            defaultMotionProps.animate = { opacity: 1, y: 0 }
        }

        return React.createElement(motion[htmlTag] as ElementType, { ...htmlProps,  ...defaultMotionProps }, children);
    }

    return React.createElement(htmlTag, htmlProps, children);
}
