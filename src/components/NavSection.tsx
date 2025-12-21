'use client';

import React, { useState, useEffect } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { AnimatePresence, motion } from "motion/react";
import '@/styles/nav.scss'
import useViewTransition from "@/hooks/useViewTransition";

interface NavAvailabilityProps {
    count: number;
    className?: string;
}

export default function NavSection() {
    const { routeTo } = useViewTransition()
    const [time, setTime] = useState<Date | null>(null);
    const [is24Hour, setIs24Hour] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: !is24Hour,
            hour: is24Hour ? '2-digit' : 'numeric',
            minute: '2-digit'
        });
    }; 

    return (
        <main className="nav">
            <nav>
                <section className="nav-left">
                    <div className="nav-title"><a href="/new" onClick={(e) => {
                        e.preventDefault()
                        routeTo("/new")
                    }}>ETIN</a></div>
                    <NavAvailability count={2} />
                    <div 
                        className="nav-time" 
                        onClick={() => setIs24Hour(!is24Hour)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span>{time ? formatTime(time) : ''}</span>
                        <MdOutlineAccessTime color="rgb(105, 105, 105)" />
                    </div>
                </section>
                <section className="nav-right">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="/new">About</a></li>
                        <li className="nav-item">
                            <a href="">Services</a></li>
                        <li className="nav-item">
                            <a href="">Skills</a></li>
                        <li className="nav-item contact">
                            <a href="" onClick={(e) => {
                                e.preventDefault()
                                routeTo("/contact")
                            }}>Contact</a></li>
                    </ul>

                    <div className="nav-icon">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <TfiClose size={24} style={{ transform: 'translate(-3px)'}} /> : <RxHamburgerMenu size={26} />}
                        </button>
                    </div>
                </section>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="mobile-menu">
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <a href="">About</a></li>
                                <li className="nav-item">
                                    <a href="">Projects</a></li>
                                <li className="nav-item">
                                    <a href="">Services</a></li>
                                <li className="nav-item">
                                    <a href="">Contact</a></li>
                            </ul>
                            <NavAvailability count={7} className="mobile-availability" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}

const NavAvailability = ({ count, className = "" }: NavAvailabilityProps) => {
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

    return (
        <div className={`nav-availability ${className}`}>
            <div className="nav-availability__inner">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index}>
                        <span>Open to work / </span>
                        <span>Booking for {currentMonth} / </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
