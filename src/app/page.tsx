'use client'

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";
import MainSection from "@/components/main/MainSection";
import "./page.scss";

export default function Home() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [currentNumber, setCurrentNumber] = useState(0)

    useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <div className="app">
            <AnimatePresence initial={false} mode="wait">
                {loading ? <LoadingScreen setLoading={setLoading} /> : (
                    <motion.div key="home" className="home">
                        <nav className="nav">
                            <ul>
                                <li>
                                    <p>ETINOSA</p>
                                    <p>ENOGIOMWAN</p>
                                </li>
                                <li className="title">
                                    <p>FRONTEND DEVELOPER</p>
                                    <p>REACT | REACT NATIVE | NEXT</p>
                                </li>
                                <li><p>CONTACT</p></li>
                            </ul>
                        </nav>

                        {/* body */}
                        <MainSection />

                        {/* footer */}
                        <footer>
                            <ul>
                                <li className="call-me"><p>YOU CAN CALL ME ETIN</p></li>
                                <li className="counter">
                                    <p>0{currentNumber}</p>
                                    <div className="counter-line"></div>
                                    <p>02</p>
                                </li>
                                <li>©2025 COPYRIGHT</li>
                            </ul>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * 
    const list = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        initial: { opacity: 0, x: 800 },
        animate: (index: number) => {
            const duration = 1.8 - (0.1 * index);
            const finalDuration = Math.max(0, duration);

            return {
                opacity: 1,
                x: 0,
                transition: {
                    opacity: { duration: 1, ease: easeOut },
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.08,0,.94) },
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.04,0,.94) }, // 2.
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.06,0,.95) },
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.05,.1,.97) },

                    // x: { duration: finalDuration, ease: cubicBezier(0,1.18,0,.87) },
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.18,0,.84) }, // 1.
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.02,0,.77) },

                    // x: { duration: finalDuration, ease: cubicBezier(0,.98,.9,.51) },
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.08,1,.34) },
                    // x: { duration: finalDuration, ease: cubicBezier(0,1.07,.18,.97) },
                    // x: { duration: finalDuration, ease: cubicBezier(0,.53,.13,.96) }, // Smoothtest

                    x: { duration: finalDuration, ease: cubicBezier(0,.77,.13,.96) }, 
                }
            }
        }
    }

    <motion.div key="home" className="home">
    <div className="home-text">
        <div className="home-text__header">
            <div>
                <div>ETIN-OSA</div>
                <div>ENOGIOMWAN</div>
                <span>FRONTEND DEVELOPER</span>
            </div>

            <div>
                <div>CONTACT</div>
            </div>
        </div>

        <div className="home-text__body">
            <div className="home-text__body__inner">
                {title.map((each, index) => (
                    <motion.ul 
                        className="each-body" 
                        key={index}
                    >
                        {each.map((letter, index) => (
                            <motion.li key={index} variants={item}>
                                {letter}
                            </motion.li>
                        ))}
                    </motion.ul>
                ))}
            </div>
        </div>
    </div>

    <div className="home-image">
        <div className="home-image__header">
            <div className="header-button">
                <span>VISIT WEBSITE</span>
            </div>
        </div>

        <div className="home-image__container">
            <div className="each-image" />
        </div>

        <div className="home-image__number">
            <div>001</div>
        </div>
    </div>
</motion.div>
 */