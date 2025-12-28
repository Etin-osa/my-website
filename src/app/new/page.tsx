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
import { content, Language } from "@/data/content";

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
        year: "2025",
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
    const [langKey, setLangKey] = useState<Language>('EN');
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
        <main key={langKey}>
            <NavSection setLangKey={setLangKey} langKey={langKey} />

            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-main">
                        <MotionView 
                            isDesktop={isDesktop} 
                            htmlTag="div" 
                            htmlProps={{ className: "hero-title" }} 
                            delay={0.2}
                        >
                            <span className="gray-text">{content[langKey].home.hero.greeting}</span>
                            {content[langKey].home.hero.intro1 + ' '}
                            {/* <span className="hero-images">
                                <motion.span 
                                    className="hero-img-wrapper"
                                    initial={{ scale: 1.1, x: -20, opacity: 0, rotate: 4 }} 
                                    animate={{ scale: 1, x: 0, opacity: 1, rotate: 4 }} 
                                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.205 }}
                                    whileHover={{ rotate: 0, scale: 1.06, transition: { duration: 0.2, ease: "easeInOut" } }} 
                                >
                                    <Image src="/images/profile_(2).jpg" alt="profile 1" width={50} height={50} className="hero-img" />
                                    <span className="tooltip">{content[langKey].home.hero.tooltip1}<span className="line"></span><span className="gray">{content[langKey].home.hero.tooltip1Span}</span></span>
                                </motion.span>
                            </span> */}
                            {content[langKey].home.hero.intro2}
                        </MotionView>
                        
                        <MotionView 
                            htmlTag="div" 
                            isDesktop={isDesktop}
                            delay={0.3}
                        >
                            <IosButton text={content[langKey].home.hero.cta} />
                        </MotionView>
                    </div>
                    
                    <div className="hero-footer">
                        <MotionView 
                            htmlTag="p" 
                            isDesktop={isDesktop} 
                            htmlProps={{className: "hero-description"}}
                            delay={0.3}
                        >
                            {content[langKey].home.hero.description}
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
                    <span>{content[langKey].home.projects.header}</span>
                    <span>{content[langKey].home.projects.year}</span>
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
                            viewport={{ once: true, amount: 0.5 }}
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
                    <span className="gray-text">[01]</span> {content[langKey].home.about.header}
                </MotionView>

                <div className="about-info">
                    <MotionView 
                        htmlTag="div" 
                        isDesktop={isDesktop} 
                        htmlProps={{className: "about-description"}} 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <span className="gray-text">{content[langKey].home.about.description1}</span>
                        {content[langKey].home.about.description2}
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
                            {content[langKey].home.about.quote}
                        </div>
                        <div className="quote-author">
                            {/* <Image src="/images/speaker_blue.jpg" alt="Author" width={56} height={56} className="author-img" /> */}
                            <div className="author-info">
                                <div className="author-name">
                                    <a href="https://www.linkedin.com/in/addapta/" target="_blank">Sergio García Martínez</a>
                                </div>
                                <span className="author-title">{content[langKey].home.about.authorRole}</span>
                            </div>
                        </div>
                    </MotionView>
                </div>
            </section>

            <MotionView htmlTag="hr" isDesktop={isDesktop} normal />

            <section className="services-section" id="services">
                <MotionView htmlTag="div" isDesktop={isDesktop} normal htmlProps={{ className: "services-header" }}>
                    <span className="gray-text">[02]</span> {content[langKey].home.services.header}
                </MotionView>

                <div className="services-info">
                    <MotionView 
                        htmlTag="div" 
                        isDesktop={isDesktop} 
                        htmlProps={{className: "services-description"}} 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <span className="gray-text">{content[langKey].home.services.description1}</span> {content[langKey].home.services.description2}
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
                                <div className="service-title">{content[langKey].home.services.webDev.title}</div>
                            </div>
                            <div className="service-right">
                                {content[langKey].home.services.webDev.items.map((item, i) => <span key={i}>{item}</span>)}
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
                                <div className="service-title">{content[langKey].home.services.appDev.title}</div>
                            </div>
                            <div className="service-right">
                                {content[langKey].home.services.appDev.items.map((item, i) => <span key={i}>{item}</span>)}
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
                                <div className="service-title">{content[langKey].home.services.backendDev.title}</div>
                            </div>
                            <div className="service-right">
                                {content[langKey].home.services.backendDev.items.map((item, i) => <span key={i}>{item}</span>)}
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
                                <div className="service-title">{content[langKey].home.services.cto.title}</div>
                            </div>
                            <div className="service-right">
                                {content[langKey].home.services.cto.items.map((item, i) => <span key={i}>{item}</span>)}
                            </div>
                        </MotionView>
                    </div>
                </div>
            </section>

            <section className="skills-section" id="skills">
                <MotionView normal htmlTag="div" isDesktop={isDesktop} htmlProps={{ className: "skills-header" }}>
                    <span className="gray-text">[03]</span> {content[langKey].home.skills.header}
                </MotionView>

                <div className="skills-info">
                    <MotionView 
                        htmlTag="div" 
                        isDesktop={isDesktop} 
                        htmlProps={{ className: "skills-description" }} 
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <span className="gray-text">{content[langKey].home.skills.description1}</span> {content[langKey].home.skills.description2}
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

            <FooterSection langKey={langKey} />
        </main>
    );
}
