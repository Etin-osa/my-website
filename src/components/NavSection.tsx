'use client';

import React, { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { motion } from "motion/react";

import '@/styles/nav.scss'
import useViewTransition from "@/hooks/useViewTransition";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";

interface NavAvailabilityProps {
    count: number;
    className?: string;
    delay?: number;
}

export default function NavSection() {
    const { routeTo, prefetch } = useViewTransition()
    const [is24Hour, setIs24Hour] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const formatTime = () => {
        return new Date().toLocaleTimeString('en-US', {
            hour12: !is24Hour,
            hour: is24Hour ? '2-digit' : 'numeric',
            minute: '2-digit'
        });
    }; 

    return (
        <main className="nav">
            <ScrollToTopOnNavigate />
            <nav>
                <section className="nav-left">
                    <motion.div 
                        className="nav-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div onClick={(e) => {routeTo("/new")}}>ETIN</div>
                    </motion.div>
                    <NavAvailability count={2} delay={0.2} />
                    <motion.div 
                        className="nav-time" 
                        onClick={() => setIs24Hour(!is24Hour)}
                        style={{ cursor: 'pointer' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <span>{formatTime()}</span>
                        <MdOutlineAccessTime color="rgb(105, 105, 105)" />
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
                            <button>About</button>
                        </li>
                        <li className="nav-item">
                            <button>Services</button>
                        </li>
                        <li className="nav-item">
                            <button>Skills</button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="contact" 
                                onMouseEnter={() => prefetch("/contact")} 
                                onClick={() => { routeTo("/contact") }}
                            >Contact</button>
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
                            <button>About</button></li>
                        <li className="nav-item">
                            <button>Services</button></li>
                        <li className="nav-item">
                            <button>Skills</button></li>
                        <li className="nav-item">
                            <button>Contact</button></li>
                    </ul>
                    <NavAvailability count={7} className="mobile-availability" />
                </div>
            </motion.div>
        </main>
    )
}

const NavAvailability = ({ count, className = "", delay = 0 }: NavAvailabilityProps) => {
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

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
                        <span>Open to work / </span>
                        <span>Booking for {currentMonth} / </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
