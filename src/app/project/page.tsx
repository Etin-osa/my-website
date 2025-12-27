"use client";

import FooterSection from "@/components/FooterSection";
import NavSection from "@/components/NavSection";
import { RiArrowGoBackFill } from "react-icons/ri";
import React, { useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useSearchParams } from "next/navigation";

import '@/styles/project.scss';
import useViewTransition from "@/hooks/useViewTransition";
import Image from "next/image";
import MotionView from "@/components/MotionView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ReactLenis } from 'lenis/react';

interface ImageGridItem {
    main: string[]
    grids: { src: string; label: string }[]
    visit: string
    title: string
}

const images: Record<string, ImageGridItem> = {
    es: {
        main: [
            '/images/repsol_es_laptop.png',
            '/images/repsol_es_tablet.png',
            '/images/repsol_es_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_es_old_tienda.png', label: 'Old Store' },
            { src: '/images/repsol_es_new_tienda.png', label: 'New Store' },
            { src: '/images/repsol_es_search.png', label: 'Screen with Suggestion' },
            { src: '/images/repsol_es_404.png', label: 'No Results Page' },
        ],
        visit: 'https://www.repsol.es/particulares/buscador/#q=repsol&t=particulares&numberOfResults=12',
        title: 'Repsol Search ES — Implementation of a New Search Experience for Repsol’s Spanish Website'
    },
    com: {
        main: [
            '/images/repsol_com_laptop.png',
            '/images/repsol_com_tablet.png',
            '/images/repsol_com_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_com_old_card.png', label: 'Old Card' },
            { src: '/images/repsol_com_new_card.png', label: 'New Card' },
            { src: '/images/repsol_com_old_mobile.png', label: 'Old Mobile No Results Page' },
            { src: '/images/repsol_com_new_mobile.png', label: 'New Mobile No Results Page' },
        ],
        visit: 'https://www.repsol.com/es/buscador/index.cshtml#q=butano&sort=relevancy',
        title: 'Repsol Search COM — Implementation of a New Search Experience for Repsol’s Global Website'
    },
    lubricantes: {
        main: [
            '/images/repsol_lubricantes_laptop.png',
            '/images/repsol_lubricantes_tablet.png',
            '/images/repsol_lubricantes_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_lubricantes_old_screen.png', label: 'Old Screen' },
            { src: '/images/repsol_lubricantes_new_screen.png', label: 'New Screen' },
            { src: '/images/repsol_lubricantes_old_card.png', label: 'Old Card' },
            { src: '/images/repsol_lubricantes_new_card.png', label: 'New Card' },
        ],
        visit: 'https://lubricants.repsol.com/es/search-engine/#q=repsol&sort=relevancy',
        title: 'Repsol Search Lubricantes — Implementation of a New Search Experience for Lubricantes Repsol Website'
    },
    pt: {
        main: [
            '/images/repsol_pt_laptop.png',
            '/images/repsol_pt_tablet.png',
            '/images/repsol_pt_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_pt_old_screen.png', label: 'Old Screen' },
            { src: '/images/repsol_pt_new_screen.png', label: 'New Screen' },
            { src: '/images/repsol_pt_old_404.png', label: 'Old No Results Page' },
            { src: '/images/repsol_pt_new_404.png', label: 'New No Results Page' },
        ],
        visit: 'https://www.repsol.pt/particulares/buscador/#q=repsol&t=particulares',
        title: 'Repsol Search PT — Implementation of a New Search Experience for Repsol’s Portuguese Website'
    },
}

export default function page() {
    const { routeTo } = useViewTransition()
    const searchParams = useSearchParams()
    const [langKey, setLangKey] = useState('EN');
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <main key={langKey}>
            <NavSection setLangKey={setLangKey} langKey={langKey} />

            <section className="project-details-section">
                <div className="project-header-content">
                    <div className="header-left">
                        <MotionView 
                            htmlTag="div" 
                            isDesktop={isDesktop} 
                            htmlProps={{ className: "back-button-wrapper" }}
                            delay={0.2}
                        >
                            <button className="back-button" onClick={() => routeTo('/new')}>
                                <span className="icon-box"><RiArrowGoBackFill /></span>
                                <span>Back</span>
                            </button>
                        </MotionView>
                        <MotionView
                            isDesktop={isDesktop}
                            htmlTag="div"
                            htmlProps={{ className: "project-title-wrapper" }}
                            delay={0.25}
                        >
                            <h1 className="project-title">{images[searchParams.get('id') ?? ''].title}</h1>
                        </MotionView>
                    </div>
                    
                    <div className="header-right">
                        <MotionView 
                            htmlTag="p" 
                            isDesktop={isDesktop}
                            htmlProps={{ className: "project-description" }}
                            delay={0.25}
                        >
                            I led the frontend development for the new style update on Repsol's search pages, rolling out the changes across four of their international websites which are visited by thousands of people every month.
                        </MotionView>
                        
                        <div className="project-meta">
                            <MotionView 
                                htmlTag="div" 
                                isDesktop={isDesktop}
                                htmlProps={{ className: "meta-item" }}
                                delay={0.3}
                            > 
                                <span className="meta-label">Year</span>
                                <span className="meta-value">2025</span>
                            </MotionView>
                            <MotionView 
                                htmlTag="div" 
                                isDesktop={isDesktop}
                                htmlProps={{ className: "meta-item" }}
                                delay={0.35}
                            >
                                <span className="meta-label">Client</span>
                                <span className="meta-value">Repsol</span>
                            </MotionView>
                            <MotionView 
                                htmlTag="div" 
                                isDesktop={isDesktop}
                                htmlProps={{ className: "meta-item" }}
                                delay={0.4}
                            >
                                <span className="meta-label">Website</span>
                                <a className="meta-value link" href={images[searchParams.get('id') ?? ''].visit} target="_blank" rel="noopener noreferrer">
                                    <span>Visit live site </span>
                                    <BsBoxArrowUpRight style={{ transform: 'translateY(-2px)'}} />
                                </a>
                            </MotionView>
                        </div>
                    </div>
                </div>
            </section>

            <MotionView htmlTag="section" normal isDesktop={isDesktop} htmlProps={{ className: "project-content-section" }}>
                <div className="full-width-image">
                    <ReactLenis className="image-wrapper small">
                        <Image 
                            src={images[searchParams.get('id') ?? ''].main[2]} 
                            alt="Project screenshot small" 
                            width={400} 
                            height={800}
                            className="project-img"
                        />
                    </ReactLenis>
                    <ReactLenis className="image-wrapper medium">
                        <Image 
                            src={images[searchParams.get('id') ?? ''].main[1]} 
                            alt="Project screenshot medium" 
                            width={800} 
                            height={1200}
                            className="project-img"
                        />
                    </ReactLenis>
                    <ReactLenis className="image-wrapper large">
                        <Image 
                            src={images[searchParams.get('id') ?? ''].main[0]} 
                            alt="Project screenshot large" 
                            width={1600} 
                            height={1200}
                            className="project-img"
                        />
                    </ReactLenis>
                </div>

                <div className="text-section">
                    <h2 className="text-title">Problem</h2>
                    <p className="text-paragraph">
                        Repsol's existing digital platforms weren't meeting the needs of thousands of daily users. As one of Europe's leading energy companies, they needed a modern UI solution that could deliver a seamless experience across their web presence.
                    </p>
                </div>

                <div className="image-grid-section">
                    <div className="image-grid">
                        {images[searchParams.get('id') ?? ''].grids.map((item, index) => (
                            <div className="grid-image-item" key={index}>
                                <div className="image-label">{item.label}</div>
                                <div className="image-wrapper">
                                    <Image 
                                        src={item.src} 
                                        alt={item.label}
                                        fill
                                        className="grid-img"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-section">
                    <h2 className="text-title">Outcome</h2>
                    <p className="text-paragraph">
                        Collaborating with design team, I worked on the search pages across Repsol's international website, implementing a pixel-perfect, responsive interface with smooth animations and polished interactions.
                    </p>
                </div>
            </MotionView>

            <FooterSection />
        </main>
    )
}
