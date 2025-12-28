"use client";

import FooterSection from "@/components/FooterSection";
import NavSection from "@/components/NavSection";
import { RiArrowGoBackFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useSearchParams } from "next/navigation";

import '@/styles/project.scss';
import useViewTransition from "@/hooks/useViewTransition";
import Image from "next/image";
import MotionView from "@/components/MotionView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ReactLenis } from 'lenis/react';
import { content, Language } from "@/data/content";

interface ImageGridItem {
    main: string[]
    grids: { src: string }[]
    visit: string
    title: { [key in Language]: string }
}

const images: Record<string, ImageGridItem> = {
    es: {
        main: [
            '/images/repsol_es_laptop.png',
            '/images/repsol_es_tablet.png',
            '/images/repsol_es_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_es_old_tienda.png' },
            { src: '/images/repsol_es_new_tienda.png' },
            { src: '/images/repsol_es_search.png' },
            { src: '/images/repsol_es_404.png' },
        ],
        visit: 'https://www.repsol.es/particulares/buscador/#q=repsol&t=particulares&numberOfResults=12',
        title: {
            EN: 'Repsol Search ES — Implementation of a New Search Experience for Repsol’s Spanish Website',
            ES: 'Búsqueda Repsol ES — Implementación de una nueva experiencia de búsqueda para el sitio web español de Repsol'
        }
    },
    com: {
        main: [
            '/images/repsol_com_laptop.png',
            '/images/repsol_com_tablet.png',
            '/images/repsol_com_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_com_old_card.png' },
            { src: '/images/repsol_com_new_card.png' },
            { src: '/images/repsol_com_old_mobile.png' },
            { src: '/images/repsol_com_new_mobile.png' },
        ],
        visit: 'https://www.repsol.com/es/buscador/index.cshtml#q=butano&sort=relevancy',
        title: {
            EN: 'Repsol Search COM — Implementation of a New Search Experience for Repsol’s Global Website',
            ES: 'Búsqueda Repsol COM — Implementación de una nueva experiencia de búsqueda para el sitio web global de Repsol'
        }
    },
    lubricantes: {
        main: [
            '/images/repsol_lubricantes_laptop.png',
            '/images/repsol_lubricantes_tablet.png',
            '/images/repsol_lubricantes_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_lubricantes_old_screen.png' },
            { src: '/images/repsol_lubricantes_new_screen.png' },
            { src: '/images/repsol_lubricantes_old_card.png' },
            { src: '/images/repsol_lubricantes_new_card.png' },
        ],
        visit: 'https://lubricants.repsol.com/es/search-engine/#q=repsol&sort=relevancy',
        title: {
            EN: 'Repsol Search Lubricantes — Implementation of a New Search Experience for Lubricantes Repsol Website',
            ES: 'Búsqueda Repsol Lubricantes — Implementación de una nueva experiencia de búsqueda para el sitio web de Lubricantes Repsol'
        }
    },
    pt: {
        main: [
            '/images/repsol_pt_laptop.png',
            '/images/repsol_pt_tablet.png',
            '/images/repsol_pt_mobile.png',
        ],
        grids: [
            { src: '/images/repsol_pt_old_screen.png' },
            { src: '/images/repsol_pt_new_screen.png' },
            { src: '/images/repsol_pt_old_404.png' },
            { src: '/images/repsol_pt_new_404.png' },
        ],
        visit: 'https://www.repsol.pt/particulares/buscador/#q=repsol&t=particulares',
        title: {
            EN: 'Repsol Search PT — Implementation of a New Search Experience for Repsol’s Portuguese Website',
            ES: 'Búsqueda Repsol PT — Implementación de una nueva experiencia de búsqueda para el sitio web portugués de Repsol'
        }
    },
}

export default function Project() {
    const { routeTo, router } = useViewTransition()
    const searchParams = useSearchParams()
    const [paramsValue, setParamsValue] = useState<ImageGridItem | null>(null)
    const [langKey, setLangKey] = useState<Language>('EN')
    const isDesktop = useMediaQuery("(min-width: 768px)")

    useEffect(() => {
        const paramsValue = searchParams.get("id")

        if (paramsValue !== 'es' && paramsValue !== 'pt' && paramsValue !== 'com' && paramsValue !== 'lubricantes') {
            router.replace('/')
        } else {
            setParamsValue(images[paramsValue])
        }
    }, [])

    if (!paramsValue) {
        return <></>
    }

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
                            <button className="back-button" onClick={() => routeTo('/')}>
                                <span className="icon-box"><RiArrowGoBackFill /></span>
                                <span>{content[langKey].project.back}</span>
                            </button>
                        </MotionView>
                        <MotionView
                            isDesktop={isDesktop}
                            htmlTag="div"
                            htmlProps={{ className: "project-title-wrapper" }}
                            delay={0.25}
                        >
                            <h1 className="project-title">{paramsValue?.title[langKey]}</h1>
                        </MotionView>
                    </div>
                    
                    <div className="header-right">
                        <MotionView 
                            htmlTag="p" 
                            isDesktop={isDesktop} 
                            htmlProps={{ className: "project-description" }}
                            delay={0.25}
                        >
                            {content[langKey].project.description}
                        </MotionView>
                        
                        <div className="project-meta">
                            <MotionView 
                                htmlTag="div" 
                                isDesktop={isDesktop}
                                htmlProps={{ className: "meta-item" }}
                                delay={0.3}
                            > 
                                <span className="meta-label">{content[langKey].project.year}</span>
                                <span className="meta-value">2025</span>
                            </MotionView>
                            <MotionView 
                                htmlTag="div" 
                                isDesktop={isDesktop}
                                htmlProps={{ className: "meta-item" }}
                                delay={0.35}
                            >
                                <span className="meta-label">{content[langKey].project.client}</span>
                                <span className="meta-value">Repsol</span>
                            </MotionView>
                            <MotionView 
                                htmlTag="div" 
                                isDesktop={isDesktop}
                                htmlProps={{ className: "meta-item" }}
                                delay={0.4}
                            >
                                <span className="meta-label">{content[langKey].project.website}</span>
                                <a className="meta-value link" href={paramsValue?.visit} target="_blank" rel="noopener noreferrer">
                                    <span>{content[langKey].project.visit}</span>
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
                            src={paramsValue?.main[2] ?? ''} 
                            alt="Project screenshot small" 
                            width={400} 
                            height={800}
                            className="project-img"
                        />
                    </ReactLenis>
                    <ReactLenis className="image-wrapper medium">
                        <Image 
                            src={paramsValue?.main[1] ?? ''} 
                            alt="Project screenshot medium" 
                            width={800} 
                            height={1200}
                            className="project-img"
                        />
                    </ReactLenis>
                    <ReactLenis className="image-wrapper large">
                        <Image 
                            src={paramsValue?.main[0] ?? ''} 
                            alt="Project screenshot large" 
                            width={1600} 
                            height={1200}
                            className="project-img"
                        />
                    </ReactLenis>
                </div>

                <div className="text-section">
                    <h2 className="text-title">{content[langKey].project.problem.title}</h2>
                    <p className="text-paragraph">
                        {content[langKey].project.problem.description}
                    </p>
                </div>

                <div className="image-grid-section">
                    <div className="image-grid">
                        {paramsValue?.grids.map((item, index) => (
                            <div className="grid-image-item" key={index}>
                                <div className="image-wrapper">
                                    <Image 
                                        src={item.src} 
                                        alt=""
                                        fill
                                        className="grid-img"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-section">
                    <h2 className="text-title">{content[langKey].project.outcome.title}</h2>
                    <p className="text-paragraph">
                        {content[langKey].project.outcome.description}
                    </p>
                </div>
            </MotionView>

            <FooterSection langKey={langKey} />
        </main>
    )
}
