"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import NavSection from "@/components/NavSection";
import IosButton from "@/components/IosButton";
import { motion } from "motion/react";
import { FaReact, FaHtml5, FaCss3Alt, FaSass, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiRedux, SiTypescript, SiJavascript, SiTailwindcss, SiNextdotjs, SiFigma, SiFramer, SiFirebase, SiGreensock, SiMui, SiSupabase, SiShadcnui, SiExpo } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

import '@/styles/new.scss';
import FooterSection from "@/components/FooterSection";

const skills1 = [
    { name: "React", icon: <FaReact /> },
    { name: "React Native", icon: <TbBrandReactNative /> },
    { name: "Redux", icon: <SiRedux /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "Sass", icon: <FaSass /> },
    { name: "Tailwind", icon: <SiTailwindcss /> },
];

const skills2 = [
    { name: "Figma", icon: <SiFigma /> },
    { name: "Framer Motion", icon: <SiFramer /> },
    { name: "GSAP", icon: <SiGreensock /> },
    { name: "Shadcn UI", icon: <SiShadcnui /> },
    { name: "Material UI", icon: <SiMui /> },
    { name: "Supabase", icon: <SiSupabase /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "Github", icon: <FaGithub /> },
    { name: "Expo", icon: <SiExpo /> },
];


export default function Homepage() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(-1);
    const [showTopLabel, setShowTopLabel] = useState(-1);
    const [showBottomLabel, setShowBottomLabel] = useState(-1);

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
                        initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                        animate={{
                            x: mousePos.x,
                            y: mousePos.y,
                            scale: isHovered !== -1 ? 1 : 0,
                            opacity: isHovered !== -1 ? 1 : 0,
                        }}
                        transition={{
                            type: "tween",
                            ease: "circOut",
                            duration: 0.3,
                            opacity: { duration: 0.1 }
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

                <div className="about-info">
                    <div className="about-description">
                        <span className="gray-text">We’re a small team of designers passionate about creating user-focused digital solutions. </span>
                        Whether it’s a bold website or a detailed app interface, we’re here to make your ideas shine.
                    </div>

                    <div className="quote-container">
                        <div className="quote-text">
                            "Design is about solving problems with creativity. At our studio, we craft user-focused digital experiences. Leading this talented team is a privilege — and we’re passionate about meaningful design. "
                        </div>
                        <div className="quote-author">
                            <Image src="/images/speaker_blue.jpg" alt="Author" width={56} height={56} className="author-img" />
                            <div className="author-info">
                                <div className="author-name">Steve Jobs</div>
                                <span className="author-title">Co-founder, Apple</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-section">
                <div className="services-header">
                    <span className="gray-text">[02]</span> Services
                </div>

                <div className="services-info">
                    <div className="services-description">
                        <span className="gray-text">Every service we offer is tailored to meet your unique goals,</span> ensuring a seamless blend of creativity and functionality.
                    </div>

                    <div className="services-list">
                        <div className="service-item">
                            <div className="service-left">
                                <div className="service-icon">
                                    <div className="icon-box"></div>
                                </div>
                                <div className="service-title">Web Development</div>
                            </div>
                            <div className="service-right">
                                <span>Websites</span>
                                <span>Landing Pages</span>
                                <span>Front End</span>
                                <span>Framer Development</span>
                                <span>Animation</span>
                            </div>
                        </div>

                        <div className="service-item">
                            <div className="service-left">
                                <div className="service-icon">
                                    <div className="icon-box"></div>
                                </div>
                                <div className="service-title">App Development</div>
                            </div>
                            <div className="service-right">
                                <span>iOS & Android</span>
                                <span>React Native</span>
                                <span>Hybrid Apps</span>
                                <span>PWA</span>
                            </div>
                        </div>

                        <div className="service-item">
                            <div className="service-left">
                                <div className="service-icon">
                                    <div className="icon-box"></div>
                                </div>
                                <div className="service-title">CTO as a Service</div>
                            </div>
                            <div className="service-right">
                                <span>Technical Strategy</span>
                                <span>Team Leadership</span>
                                <span>Architecture</span>
                                <span>Scalability</span>
                            </div>
                        </div>

                        <div className="service-item">
                            <div className="service-left">
                                <div className="service-icon">
                                    <div className="icon-box"></div>
                                </div>
                                <div className="service-title">AI Automations</div>
                            </div>
                            <div className="service-right">
                                <span>Chatbots</span>
                                <span>Workflow Automation</span>
                                <span>Data Processing</span>
                                <span>Custom AI Solutions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="skills-section">
                <div className="skills-header">
                    <span className="gray-text">[03]</span> Skills
                </div>

                <div className="skills-info">
                    <div className="skills-description">
                        <span className="gray-text">Every service we offer is tailored to meet your unique goals,</span> ensuring a seamless blend of creativity and functionality.
                    </div>

                    <div className="skills-scroller" data-direction="left">
                        <div 
                            className="scroller-inner"
                            style={{
                                animationPlayState: showTopLabel !== -1 ? 'paused' : 'running',
                            }}
                        >
                            {[...skills1, ...skills1].map((skill, index) => (
                                <div className="skill-item" key={`row1-${index}`}>
                                    <motion.div 
                                        className="skill-tooltip"
                                        animate={{
                                            transform: showTopLabel === index ? 'translateY(0px) scale(1)' : 'translateY(55px) scale(0)',
                                        }}
                                    >
                                        <span className="skill-name">{skill.name}</span>
                                    </motion.div>
                                    <div 
                                        className="skill-icon"
                                        onClick={() => setShowTopLabel(showTopLabel === -1 ? index : -1)}
                                        onMouseEnter={() => setShowTopLabel(index)}
                                        onMouseLeave={() => setShowTopLabel(-1)}
                                        style={{
                                            backgroundColor: showTopLabel === index ? 'rgb(214, 214, 214)' : 'rgb(242, 242, 242)',
                                        }}
                                    >
                                        {skill.icon}
                                    </div>
                                </div>
                            ))}
                        </div>  
                    </div>
                    
                    <div className="skills-scroller" data-direction="right">
                        <div 
                            className="scroller-inner"
                            style={{
                                animationPlayState: showBottomLabel !== -1 ? 'paused' : 'running',
                            }}
                        >
                            {[...skills2, ...skills2].map((skill, index) => (
                                <div className="skill-item" key={`row2-${index}`}>
                                    <motion.div 
                                        className="skill-tooltip"
                                        animate={{
                                            transform: showBottomLabel === index ? 'translateY(0px) scale(1)' : 'translateY(55px) scale(0)',
                                        }}
                                    >
                                        <span className="skill-name">{skill.name}</span>
                                    </motion.div>
                                    <div 
                                        className="skill-icon" 
                                        onClick={() => setShowBottomLabel(showBottomLabel === -1 ? index : -1)}
                                        style={{
                                            backgroundColor: showBottomLabel === index ? 'rgb(214, 214, 214)' : 'rgb(242, 242, 242)',
                                        }}
                                        onMouseEnter={() => setShowBottomLabel(index)}
                                        onMouseLeave={() => setShowBottomLabel(-1)}
                                    >
                                        {skill.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FooterSection />
        </main>
    );
}
