"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="sync">
            <motion.div
                key={pathname}
                initial={{ 
                    y: '100vh', 
                    opacity: 0, 
                    transition: { ease: "easeOut", duration: 2 } 
                }}
                animate={{ 
                    y: '0vh', 
                    opacity: 1, 
                    transition: { ease: "easeIn", duration: 2 } 
                }}
                exit={{ 
                    y: '-100vh', 
                    opacity: 1, 
                    transition: { ease: "easeOut", duration: 2 } 
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
