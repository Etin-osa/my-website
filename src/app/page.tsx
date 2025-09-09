'use client'

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState, useEffect, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MainSection from "@/components/main/MainSection";
import "./page.scss";

export default function Home() {
    const mouseRef = useRef<HTMLDivElement | null>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [loading, setLoading] = useState(true)
    const [currentNumber, setCurrentNumber] = useState(1)

    const springX = useSpring(mouseX, {
        stiffness: 250,
        damping: 30,
        mass: 0.5,
    });
    const springY = useSpring(mouseY, {
        stiffness: 250,
        damping: 30,
        mass: 0.5,
    });

    const handleMousemove = (e: MouseEvent) => {
        if (window.innerWidth > 1000 && mouseRef.current) {
            mouseX.set(e.clientX + 10)
            mouseY.set(e.clientY + 10)
            mouseRef.current.style.opacity = '1'
        }
    }

    const handleMouseLinkInteractions = (enterorleave: "enter" | "leave") => {
        if (window.innerWidth > 1000 && mouseRef.current) {
            if (enterorleave === "leave") {
                mouseRef.current.style.backgroundColor = '#fff'
                mouseRef.current.style.width = '20px'
                mouseRef.current.style.height = '20px',
                mouseRef.current.style.border = 'none'
                mouseRef.current.style.zIndex = '0'
                mouseRef.current.innerHTML = ``
            } else {
                mouseRef.current.style.backgroundColor = 'transparent'
                mouseRef.current.style.width = '80px'
                mouseRef.current.style.height = '80px',
                mouseRef.current.style.border = '1px solid #FFF'
                mouseRef.current.style.zIndex = '0'
            }
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMousemove)
        
        return () => {
            window.removeEventListener('mousemove', handleMousemove)
        }
    }, [])

    return (
        <div className="app">
            <AnimatePresence>
                {loading ? <LoadingScreen setLoading={setLoading} /> : (
                    <motion.div key="home" className="home">
                        <motion.nav 
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                            className="nav"
                        >
                            <ul>
                                <li>
                                    <p>ETINOSA</p>
                                    <p>ENOGIOMWAN</p>
                                </li>
                                <li className="title">
                                    <p>FRONTEND DEVELOPER</p>
                                </li>
                                <li className="nav-link">
                                    <a 
                                        href="https://www.linkedin.com/in/etin-osa02/" target="blank"
                                        onMouseMove={() => handleMouseLinkInteractions("enter")}
                                        onMouseLeave={() => handleMouseLinkInteractions("leave")}
                                    >LINKEDIN</a>
                                    <div />
                                    <a 
                                        href="https://github.com/Etin-osa" target="blank"
                                        onMouseMove={() => handleMouseLinkInteractions("enter")}
                                        onMouseLeave={() => handleMouseLinkInteractions("leave")}
                                    >GITHUB</a>
                                </li>
                            </ul>
                        </motion.nav>

                        <MainSection 
                            setCurrentNumber={setCurrentNumber} 
                            mouseRef={mouseRef}
                            handleMouseLinkInteractions={handleMouseLinkInteractions}
                        />

                        <motion.footer
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                        >
                            <ul>
                                <li className="call-me"><p>Call me ETIN</p></li>
                                <li className="counter">
                                    <p>0{currentNumber}</p>
                                    <div className="counter-line"></div>
                                    <p>02</p>
                                </li>
                                <li><p>©2025 COPYRIGHT</p></li>
                            </ul>
                        </motion.footer>
                    </motion.div>
                )}

                {!loading &&
                    <motion.div 
                        key={"mouse"} 
                        ref={mouseRef}
                        className="circle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ x: springX, y: springY }}
                    ></motion.div>
                }
            </AnimatePresence>
        </div>
    );
}
