'use client'

import { AnimatePresence, cubicBezier, easeOut, motion } from "motion/react";
import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import "./page.scss";

const title = [
    ["R", "E", "P", "S", "O", "L"],
    ["N", "A", "R", "I", "A"]
]
const number = [["0", "0", "1"], ["0", "0", "2"]]
const imagelist = [
    "/images/repsol.png",
    "/images/naria.png"
]

export default function Home() {
    const [loading, setLoading] = useState(false)

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

    return (
        <div className="app">
            <AnimatePresence initial={false} mode="wait">
                {loading ? <LoadingScreen setLoading={setLoading} /> : (
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
                                {title.map((each, index) => (
                                    <ul className="each-body" key={index}>
                                        {each.map((letter, index) => (
                                            <motion.li key={index} variants={item}>
                                                {letter}
                                            </motion.li>
                                        ))}
                                    </ul>
                                ))}
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
                )}
            </AnimatePresence>
        </div>
    );
}


// Animation Description
// The animation is staggered from left to right.
// Although the first element starts the movement they all stop moving at the same time.
// The opacity ends before the movement completes.

// When the next slides in.. the other text is sliding out but not completely so there is an overlap between the coming and going.