"use client";

import React, { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { motion } from "motion/react";

import FooterSection from "@/components/FooterSection";
import { Language } from "@/data/content";
import NavSection from "@/components/NavSection";
import useViewTransition from "@/hooks/useViewTransition";

export default function NotFound() {
    const { routeTo } = useViewTransition()
    const [langKey, setLangKey] = useState<Language>('EN')

    return (
        <main key={langKey}>
            <NavSection setLangKey={setLangKey} langKey={langKey} />

            <section className="not-found-container">
                <h2>404 - This page doesn't exist</h2>
                <motion.button 
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ opacity: 0.8, scale: 1.06, transition: { duration: 0.3, ease: "easeInOut" } }}
                    transition={{ duration: .4, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
                    onClick={() => routeTo('/')}
                >
                    <span>Back to homepage</span>
                    <span><RiArrowGoBackFill style={{ transform: 'translateY(2px)'}} /></span>
                </motion.button>
            </section>

            <FooterSection langKey={langKey} />
        </main>
    );
}
