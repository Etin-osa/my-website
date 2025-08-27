'use client'

import { cubicBezier, easeOut, motion } from "motion/react";
import "./page.scss";

export default function Home() {
    const title = ["R", "E", "P", "S", "O", "L"];

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
            <div className="app-text">
                <div className="app-text__header">
                    <div>
                        <div>ETIN-OSA</div>
                        <div>ENOGIOMWAN</div>
                        <span>FRONTEND DEVELOPER</span>
                    </div>

                    <div>
                        <div>CONTACT</div>
                    </div>
                </div>

                <div className="app-text__body">
                    {/* <motion.ul 
                        className="each-body" 
                        initial="initial" 
                        animate="animate" 
                        variants={list}
                    >
                        {title.map((letter, index) => 
                            <motion.li key={index} custom={index} variants={item}>{letter}</motion.li>
                        )}
                    </motion.ul> */}
                </div>
            </div>

            <div className="app-image">
                <div className="app-image__header">
                    <button>
                        <span>VISIT WEBSITE</span>
                    </button>
                </div>

                <div className="app-image__container">
                    <div className="each-image" />
                </div>

                <div className="app-image__number">
                    <div>001</div>
                </div>
            </div>
        </div>
    );
}


// Animation Description
// The animation is staggered from left to right.
// Although the first element starts the movement they all stop moving at the same time.
// The opacity ends before the movement completes.

// When the next slides in.. the other text is sliding out but not completely so there is an overlap between the coming and going.