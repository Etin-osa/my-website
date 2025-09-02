'use client'

import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MainSection from "@/components/main/MainSection";
import "./page.scss";

export default function Home() {
    const mouseRef = useRef<HTMLDivElement | null>(null)
    const [loading, setLoading] = useState(true)
    const [currentNumber, setCurrentNumber] = useState(1)
    const [inImage, setInImage] = useState(false)
    const [inLink, setInLink] = useState(false)

    const handleMousemove = (e: any) => requestAnimationFrame(() => {
        if (!mouseRef.current) {
            return;
        }

        if (window.innerWidth > 1365) {
            if (inImage) {
                mouseRef.current.style.opacity = '0'
            } else {
                mouseRef.current.style.opacity = '1'
            }
            mouseRef.current.style.transform = `scale(1) translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
        }
    })

    const handleMouseleave = () => {
        if (!mouseRef.current) {
            return;
        }

        mouseRef.current.style.opacity = '0'
    }

    useEffect(() => {
        if (mouseRef.current) {
            if (inLink && !mouseRef.current.classList.contains("link")) {
                mouseRef.current.classList.add("link")
            } else if (!inLink && mouseRef.current.classList.contains("link")) {
                mouseRef.current.classList.remove("link")
            }
        }
    }, [inLink])

    return (
        <div 
            className="app"
            onMouseMove={handleMousemove}
            onMouseLeave={handleMouseleave}
        >
            <AnimatePresence initial={false} mode="wait">
                {loading ? <LoadingScreen setLoading={setLoading} /> : (
                    <motion.div key="home" className="home">
                        <motion.nav className="nav">
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
                                        onMouseEnter={() => {
                                            console.log("kdj")
                                            setInLink(true)}}
                                        onMouseLeave={() => setInLink(false)}
                                    >LINKEDIN</a>
                                    <div />
                                    <a 
                                        href="https://github.com/Etin-osa" target="blank"
                                        onMouseEnter={() => setInLink(true)}
                                        onMouseLeave={() => setInLink(false)}
                                    >GITHUB</a>
                                </li>
                            </ul>
                        </motion.nav>

                        <MainSection 
                            setCurrentNumber={setCurrentNumber} 
                            setInImage={setInImage}
                            setInLink={setInLink}
                        />

                        <motion.footer>
                            <ul>
                                <li className="call-me"><p>Call me ETIN</p></li>
                                <li className="counter">
                                    <p>0{currentNumber}</p>
                                    <div className="counter-line"></div>
                                    <p>03</p>
                                </li>
                                <li>©2025 COPYRIGHT</li>
                            </ul>
                        </motion.footer>
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && <div ref={mouseRef} className="circle"></div>}
        </div>
    );
}
