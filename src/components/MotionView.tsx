import React from "react";
import { motion } from "motion/react";

export default function MotionView({ isDesktop, children, htmlTag, motionProps, htmlProps, viewport, delay = 0, normal }: {
    isDesktop?: boolean | null
    children?: React.ReactNode
    htmlTag: 'div' | 'p' | 'main' | 'span' | 'nav' | 'hr' | 'footer' | 'section'
    motionProps?: { [key: string]: any }
    htmlProps?: { [key: string]: any }
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

        let defaultMotionProps: { [key: string]: any } = {};

        if (!motionProps) {
            defaultMotionProps = {
                initial: { opacity: 0, y: 80 }, 
                animate: { opacity: 1, y: 0 }, 
                transition: { type: "spring", stiffness: 80, damping: 30, mass: 1, delay }
            }
        }

        if (viewport) {
            defaultMotionProps.viewport = viewport
        }

        return React.createElement(motion[htmlTag], { ...htmlProps,  ...defaultMotionProps, ...motionProps }, children);
    }

    return React.createElement(htmlTag, htmlProps, children);
}
