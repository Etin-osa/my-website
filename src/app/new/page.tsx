"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import NavSection from "@/components/NavSection";
import IosButton from "@/components/IosButton";
import { motion, useAnimate, useMotionValue, useSpring, useTime } from "motion/react";

import '@/styles/new.scss';


export default function Homepage() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(-1);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        
        setMousePos({ x: clientX, y: clientY });
    };


    return (
        <main>
            <NavSection />

            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-main">
                        <div className="hero-title">
                            <span className="gray-text">Hey. </span>
                            We
                            <span className="hero-images">
                                <span className="hero-img-wrapper">
                                    <Image src="/images/speaker_blue.jpg" alt="profile 1" width={45} height={45} className="hero-img" />
                                    <span className="tooltip">Etin <span className="line"></span><span className="gray">Software Developer </span></span>
                                </span>
                                <span className="hero-img-wrapper">
                                    <Image src="/images/speaker_orange.jpg" alt="profile 2" width={45} height={45} className="hero-img" />
                                    <span className="tooltip">Etin <span className="line"></span><span className="gray">AI Automation</span></span>
                                </span>
                            </span>
                            design meaningful experiences that connect people and ideas worldwide.
                        </div>
                        
                        <IosButton text="Get in touch" />
                    </div>
                    
                    <div className="hero-footer">
                        <p className="hero-description">
                            We work closely with clients to design and develop digital experiences that not only look stunning but also deliver measurable results.
                        </p>
                    </div>
                </div>
            </section>

            <section className="projects-section">
                <div className="projects-header">
                    <span>Selected projects</span>
                    <span>&apos;23 - Present</span>
                </div>
                <div 
                    className="projects-grid"
                    ref={gridRef}
                    onMouseMove={handleMouseMove}
                    style={{ position: 'relative' }}
                >
                    {[1, 2, 3, 4].map((item, ind) => (
                        <div className="project-item" key={item}>
                            <div 
                                className="project-image-placeholder" 
                                onMouseEnter={() => setIsHovered(ind)}
                                onMouseLeave={() => setIsHovered(-1)}
                            >
                                {/* Image goes here */}
                            </div>
                            <div className="project-info">
                                <span className="project-name">Project Name {item}</span>
                                <div className="project-meta">
                                    <span>2024</span>
                                    <span>Web Development</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <motion.div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            pointerEvents: 'none',
                            translateX: "-50%",
                            translateY: "30px",
                            zIndex: 10,
                        }}
                        animate={{
                            x: mousePos.x,
                            y: mousePos.y,
                            scale: isHovered !== -1 ? 1 : 0,
                            opacity: isHovered !== -1 ? 1 : 0,
                        }}
                        transition={{
                            type: "tween",
                            ease: "backOut",
                            duration: 0.3,
                            opacity: { duration: 0.2, }
                        }}
                    >
                        <IosButton 
                            text="Explore" 
                            className="project-hover-btn"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="about-section">
                <div className="about-header">
                    <span className="gray-text">[01]</span> Who am i
                </div>
                
                <div className="about-description">
                    <span className="gray-text">We’re a small team of designers passionate about creating user-focused digital solutions. </span>
                    Whether it’s a bold website or a detailed app interface, we’re here to make your ideas shine.
                </div>

                <div className="quote-container">
                    <div className="quote-text">
                        &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
                    </div>
                    <div className="quote-author">
                        <Image src="/images/speaker_blue.jpg" alt="Author" width={50} height={50} className="author-img" />
                        <div className="author-info">
                            <span className="author-name">Steve Jobs</span>
                            <span className="author-title">Co-founder, Apple</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
