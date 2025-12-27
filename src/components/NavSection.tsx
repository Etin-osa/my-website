'use client';

import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from 'lenis/react';

import '@/styles/nav.scss'
import useViewTransition from "@/hooks/useViewTransition";
import { usePathname } from "next/navigation";
import { content, Language } from "@/data/content";

interface NavAvailabilityProps {
    count: number;
    className?: string;
    delay?: number;
    langKey: Language;
}

interface NavSectionProps {
    setLangKey: (lang: Language) => void;
    langKey: Language;
}

export default function NavSection({ setLangKey, langKey }: NavSectionProps) {
    const lenis = useLenis();
    const pathname = usePathname()
    const { routeTo, prefetch, isPathnameCurrent } = useViewTransition()
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const handleLangChange = (lang: Language) => {
        setLangKey(lang);
        sessionStorage.setItem('lang', lang);
    };

    useEffect(() => {
        const savedLang = sessionStorage.getItem('lang');
        if (savedLang) {
            setLangKey(savedLang as Language);
        } else {
            const browserLang = navigator.language.split('-')[0].toUpperCase();
            const defaultLang = ['EN', 'ES'].includes(browserLang) ? browserLang : 'EN';
            setLangKey(defaultLang as Language);
            sessionStorage.setItem('lang', defaultLang);
        }
    }, []);

    useEffect(() => {
        lenis?.scrollTo(0, { immediate: true });
    }, [pathname]);

    return (
        <main className="nav">
            <nav>
                <section className="nav-left">
                    <motion.div 
                        className="nav-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button onMouseEnter={() => prefetch("/new")} onClick={() => { routeTo("/new") }}>ETIN</button>
                    </motion.div>
                    <NavAvailability count={2} delay={0.2} langKey={langKey} />
                    <motion.div 
                        className="nav-language" 
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        onMouseEnter={() => setIsLangOpen(true)}
                        onMouseLeave={() => setIsLangOpen(false)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <span>{langKey}</span>
                        <AnimatePresence>
                            {isLangOpen && (
                                <motion.div 
                                    className="lang-dropdown"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div onClick={(e) => { e.stopPropagation(); handleLangChange('EN'); setIsLangOpen(false); }}>EN</div>
                                    <div onClick={(e) => { e.stopPropagation(); handleLangChange('ES'); setIsLangOpen(false); }}>ES</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </section>
                <motion.section 
                    className="nav-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <ul className="nav-list">
                        <li className="nav-item">
                            <button onClick={() => {
                                if (!isPathnameCurrent("/new")) {
                                    routeTo("/new", { scrollTo: 'about' })
                                } else {
                                    lenis?.scrollTo('#about', { offset: -50 })
                                    setIsMenuOpen(false)
                                }
                            }}>{content[langKey].nav.about}</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => {
                                if (!isPathnameCurrent("/new")) {
                                    routeTo("/new", { scrollTo: 'services' })
                                } else {
                                    lenis?.scrollTo('#services', { offset: -50 })
                                    setIsMenuOpen(false)
                                }
                            }}>{content[langKey].nav.services}</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => {
                                if (!isPathnameCurrent("/new")) {
                                    routeTo("/new", { scrollTo: 'skills' })
                                } else {
                                    lenis?.scrollTo('#skills', { offset: -50 })
                                    setIsMenuOpen(false)
                                }
                            }}>{content[langKey].nav.skills}</button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="contact" 
                                onMouseEnter={() => prefetch("/contact")} 
                                onClick={() => { routeTo("/contact") }}
                            >{content[langKey].nav.contact}</button>
                        </li>
                    </ul>

                    <div className="nav-icon">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <TfiClose size={24} style={{ transform: 'translate(-3px)'}} /> : <RxHamburgerMenu size={26} />}
                        </button>
                    </div>
                </motion.section>
            </nav>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isMenuOpen ?  "auto" : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
            >
                <div className="mobile-menu">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <button onClick={() => {
                                if (!isPathnameCurrent("/new")) {
                                    routeTo("/new", { scrollTo: 'about' })
                                } else {
                                    lenis?.scrollTo('#about', { offset: -50 })
                                    setIsMenuOpen(false)
                                }

                            }}>{content[langKey].nav.about}</button></li>
                        <li className="nav-item">
                            <button onClick={() => {
                                if (!isPathnameCurrent("/new")) {
                                    routeTo("/new", { scrollTo: 'services' })
                                } else {
                                    lenis?.scrollTo('#services', { offset: -50 })
                                    setIsMenuOpen(false)
                                }
                            }}>{content[langKey].nav.services}</button></li>
                        <li className="nav-item">
                            <button onClick={() => {
                                if (!isPathnameCurrent("/new")) {
                                    routeTo("/new", { scrollTo: 'skills' })
                                } else {
                                    lenis?.scrollTo('#skills', { offset: -50 })
                                    setIsMenuOpen(false)
                                }
                            }}>{content[langKey].nav.skills}</button></li>
                        <li className="nav-item">
                            <button
                                className="contact" 
                                onMouseEnter={() => prefetch("/contact")} 
                                onClick={() => { routeTo("/contact") }}
                            >{content[langKey].nav.contact}</button></li>
                    </ul>
                    <NavAvailability count={7} className="mobile-availability" langKey={langKey} />
                </div>
            </motion.div>
        </main>
    )
}

const NavAvailability = ({ count, className = "", delay = 0, langKey }: NavAvailabilityProps) => {
    const currentMonth = new Date().toLocaleString(langKey === 'ES' ? 'es-ES' : 'en-US', { month: 'long' });

    return (
        <motion.div 
            className={`nav-availability ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="nav-availability__inner">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index}>
                        <span>{content[langKey].nav.openToWork} / </span>
                        <span>{content[langKey].nav.bookingFor} {currentMonth} / </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
