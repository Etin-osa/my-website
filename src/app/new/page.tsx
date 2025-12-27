"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavSection from "@/components/NavSection";
import IosButton from "@/components/IosButton";
import { FaReact, FaHtml5, FaCss3Alt, FaSass, FaGitAlt, FaGithub } from "react-icons/fa";
import { BsArrowUpRightCircle, BsMenuApp } from "react-icons/bs";
import { 
    SiRedux, 
    SiTypescript, 
    SiJavascript, 
    SiTailwindcss, 
    SiNextdotjs, 
    SiFigma, 
    SiFramer, 
    SiFirebase, 
    SiGreensock, 
    SiMui, 
    SiSupabase, 
    SiShadcnui, 
    SiExpo 
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { CgSmartphoneChip } from "react-icons/cg";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { LuCodeXml } from "react-icons/lu";
import { motion } from "framer-motion";

import '@/styles/new.scss';
import FooterSection from "@/components/FooterSection";
import useViewTransition from "@/hooks/useViewTransition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MotionView from "@/components/MotionView";
import { useLenis } from "lenis/react";

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

const projects = [
    {
        id: 1,
        name: "Repsol.ES",
        key: 'es',
        year: "2024",
    },
    {
        id: 2,
        name: "Repsol.Com",
        key: 'com',
        year: "2025",
    },
    {
        id: 3,
        name: "Lubricantes",
        key: 'lubricantes',
        year: "2025",
    },
    {
        id: 4,
        name: "Repsol.PT",
        key: 'pt',
        year: "2025",
    }
];

export default function Homepage() {
    const { routeTo } = useViewTransition()
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const lenis = useLenis();

    useEffect(() => {
        const scrollToId = sessionStorage.getItem('scrollTo');
        let timer : NodeJS.Timeout;

        if (scrollToId && lenis) {
            timer = setTimeout(() => {
                lenis.scrollTo(`#${scrollToId}`, { offset: -50 });
                sessionStorage.removeItem('scrollTo');
            }, 500);
        }

        return () => {
            clearTimeout(timer)
        }
    }, []);

    const [showTopLabel, setShowTopLabel] = useState(-1)
    const [showBottomLabel, setShowBottomLabel] = useState(-1)

    return (
        <main>
            <NavSection />

            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-main">
                        <MotionView 
                            isDesktop={isDesktop} 
                            htmlTag="div" 
                            htmlProps={{ className: "hero-title" }} 
                            delay={0.2}
                        >
                            <span className="gray-text">Hey. </span>
                            We
                            <span className="hero-images">
                                <motion.span 
                                    className="hero-img-wrapper"
                                    initial={{ scale: 1.1, x: -20, opacity: 0, rotate: 4 }} 
                                    animate={{ scale: 1, x: 0, opacity: 1, rotate: 4 }} 
                                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.205 }}
                                    whileHover={{ rotate: 0, scale: 1.06, transition: { duration: 0.2, ease: "easeInOut" } }} 
                                >
                                    <Image src="/images/speaker_blue.jpg" alt="profile 1" width={45} height={45} className="hero-img" />
                                    <span className="tooltip">Etin <span className="line"></span><span className="gray">Software Developer </span></span>
                                </motion.span>
                                <motion.span
                                    className="hero-img-wrapper"
                                    initial={{ scale: 1.1, x: -20, opacity: 0, rotate: -4 }} 
                                    animate={{ scale: 1, x: 0, opacity: 1, rotate: -4 }} 
                                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0 }}
                                    whileHover={{ rotate: 0, scale: 1.06, transition: { duration: 0.2, ease: "easeInOut" } }}
                                >
                                    <Image src="/images/speaker_orange.jpg" alt="profile 2" width={45} height={45} className="hero-img" />
                                    <span className="tooltip">Etin <span className="line"></span><span className="gray">AI Automation</span></span>
                                </motion.span>
                            </span>
                            design meaningful experiences that connect people and ideas worldwide.
                        </MotionView>
                        
                        <MotionView 
                            htmlTag="div" 
                            isDesktop={isDesktop}
                            delay={0.3}
                        >
                            <IosButton text="Get in touch" />
                        </MotionView>
                    </div>
                    
                    <div className="hero-footer">
                        <MotionView 
                            htmlTag="p" 
                            isDesktop={isDesktop} 
                            htmlProps={{className: "hero-description"}}
                            delay={0.3}
                        >
                            We work closely with clients to design and develop digital experiences that not only look stunning but also deliver measurable results.
                        </MotionView>
                    </div>
                </div>
            </section>

            <MotionView 
                htmlTag="hr" 
                isDesktop={isDesktop} 
                delay={0.4}
                viewport={{ once: true, amount: 0.3 }}
            />

            <section className="projects-section">
                <MotionView 
                    htmlTag="div" 
                    isDesktop={isDesktop} 
                    htmlProps={{ className: "projects-header" }} 
                    delay={0.6}
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <span>Selected projects</span>
                    <span>&apos;23 - Present</span>
                </MotionView>
                
                <div className="projects-list">
                    {projects.map((item) => (
                        <MotionView 
                            htmlTag="div" 
                            isDesktop={isDesktop} 
                            key={item.id} 
                            htmlProps={{ 
                                className: "project-text-item", 
                                onClick: () => routeTo('/project', { query: { id: item.key } })
                            }} 
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            <span className="project-year">{item.year}</span>
                            <h2 className="project-title">{item.name}</h2>
                            <div className="project-arrow">
                                <BsArrowUpRightCircle className="project-arrow-icon" />
                            </div>
                        </MotionView>
                    ))}
                </div>
            </section>

            <MotionView htmlTag="hr" isDesktop={isDesktop} normal />

            <section id="about" className="about-section">
                <MotionView htmlTag="div" isDesktop={isDesktop} normal htmlProps={{ className: "about-header" }}>
                    <span className="gray-text">[01]</span> Who am i
                </MotionView>

                <div className="about-info">
                    <MotionView 
                        htmlTag="div" 
                        isDesktop={isDesktop} 
                        htmlProps={{className: "about-description"}} 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <span className="gray-text">We’re a small team of designers passionate about creating user-focused digital solutions. </span>
                        Whether it’s a bold website or a detailed app interface, we’re here to make your ideas shine.
                    </MotionView>

                    <MotionView 
                        htmlTag="div" 
                        isDesktop={isDesktop} 
                        htmlProps={{className: "quote-container"}}
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <div className="quote-image">
                            <Image src="/images/noise.jpg" alt="Noise" fill />
                        </div>
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
                    </MotionView>
                </div>
            </section>

            <MotionView htmlTag="hr" isDesktop={isDesktop} normal />

            <section className="services-section" id="services">
                <MotionView htmlTag="div" isDesktop={isDesktop} normal htmlProps={{ className: "services-header" }}>
                    <span className="gray-text">[02]</span> Services
                </MotionView>

                <div className="services-info">
                    <MotionView 
                        htmlTag="div" 
                        isDesktop={isDesktop} 
                        htmlProps={{className: "services-description"}} 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <span className="gray-text">Every service we offer is tailored to meet your unique goals,</span> ensuring a seamless blend of creativity and functionality.
                    </MotionView>

                    <div className="services-list">
                        <MotionView 
                            htmlTag="div" 
                            isDesktop={isDesktop} 
                            htmlProps={{ className: "service-item" }} 
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <div className="service-left">
                                <div className="service-icon">
                                    <BsMenuApp className="icon-box" />
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
                        </MotionView>

                        <MotionView 
                            htmlTag="div" 
                            isDesktop={isDesktop} 
                            htmlProps={{className: "service-item"}} 
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <div className="service-left">
                                <div className="service-icon">
                                    <IoPhonePortraitOutline className="icon-box" />
                                </div>
                                <div className="service-title">App Development</div>
                            </div>
                            <div className="service-right">
                                <span>iOS & Android</span>
                                <span>React Native</span>
                                <span>Hybrid Apps</span>
                                <span>PWA</span>
                            </div>
                        </MotionView>

                        <MotionView 
                            htmlTag="div" 
                            isDesktop={isDesktop} 
                            htmlProps={{className: "service-item"}} 
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <div className="service-left">
                                <div className="service-icon">
                                    <LuCodeXml className="icon-box" />
                                </div>
                                <div className="service-title">CTO as a Service</div>
                            </div>
                            <div className="service-right">
                                <span>Technical Strategy</span>
                                <span>Team Leadership</span>
                                <span>Architecture</span>
                                <span>Scalability</span>
                            </div>
                        </MotionView>

                        <MotionView 
                            htmlTag="div" isDesktop={isDesktop} 
                            htmlProps={{className: "service-item"}} 
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <div className="service-left">
                                <div className="service-icon">
                                    <CgSmartphoneChip className="icon-box" />
                                </div>
                                <div className="service-title">AI Automations</div>
                            </div>
                            <div className="service-right">
                                <span>Chatbots</span>
                                <span>Workflow Automation</span>
                                <span>Data Processing</span>
                                <span>Custom AI Solutions</span>
                            </div>
                        </MotionView>
                    </div>
                </div>
            </section>

            <section className="skills-section" id="skills">
                <MotionView normal htmlTag="div" isDesktop={isDesktop} htmlProps={{ className: "skills-header" }}>
                    <span className="gray-text">[03]</span> Skills
                </MotionView>

                <div className="skills-info">
                    <MotionView 
                        htmlTag="div" 
                        isDesktop={isDesktop} 
                        htmlProps={{ className: "skills-description" }} 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <span className="gray-text">Every service we offer is tailored to meet your unique goals,</span> ensuring a seamless blend of creativity and functionality.
                    </MotionView>

                    <MotionView 
                        isDesktop={isDesktop} 
                        normal 
                        htmlTag="div" 
                        htmlProps={{ className: "skills-scroller", 'data-direction': 'left' }}
                    >
                        <div 
                            className="scroller-inner"
                            style={{
                                animationPlayState: showTopLabel !== -1 ? 'paused' : 'running',
                            }}
                        >
                            {[...skills1, ...skills1].map((skill, index) => (
                                <div className="skill-item" key={`row1-${index}`}>
                                    <div className={`skill-tooltip${showTopLabel === index ? ' visible' : ''}`}>
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
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
                    </MotionView>
                    
                    <MotionView isDesktop={isDesktop} normal htmlTag="div" htmlProps={{ className: "skills-scroller", 'data-direction': 'right' }}>
                        <div 
                            className="scroller-inner"
                            style={{
                                animationPlayState: showBottomLabel !== -1 ? 'paused' : 'running',
                            }}
                        >
                            {[...skills2, ...skills2].map((skill, index) => (
                                <div className="skill-item" key={`row2-${index}`}>
                                    <div className={`skill-tooltip${showBottomLabel === index ? ' visible' : ''}`}>
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
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
                    </MotionView>
                </div>
            </section>

            <FooterSection />
        </main>
    );
}
