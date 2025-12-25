"use client";

import FooterSection from "@/components/FooterSection";
import NavSection from "@/components/NavSection";
import { RiArrowGoBackFill } from "react-icons/ri";
import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useSearchParams } from "next/navigation";

import '@/styles/project.scss';
import useViewTransition from "@/hooks/useViewTransition";
import Image from "next/image";

const images: Record<string, { main: string[]; grids: { src: string; label: string }[]; visit: string }> = {
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
            { src: '/images/repsol_es_404.png', label: '404 Page' },
        ],
        visit: 'https://www.repsol.es/particulares/buscador/#q=repsol&t=particulares&numberOfResults=12'
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
            { src: '/images/repsol_com_old_mobile.png', label: 'Old Mobile 404' },
            { src: '/images/repsol_com_new_mobile.png', label: 'New Mobile 404' },
        ],
        visit: 'https://www.repsol.com/es/buscador/index.cshtml#q=butano&sort=relevancy'
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
        visit: 'https://lubricants.repsol.com/es/search-engine/#q=repsol&sort=relevancy'
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
            { src: '/images/repsol_pt_old_404.png', label: 'Old 404 Page' },
            { src: '/images/repsol_pt_new_404.png', label: 'New 404 Page' },
        ],
        visit: 'https://www.repsol.pt/particulares/buscador/#q=repsol&t=particulares'
    },
}

export default function page() {
    const { routeTo } = useViewTransition()
    const searchParams = useSearchParams()

    return (
        <main>
            <NavSection />

            <section className="project-details-section">
                <div className="project-header-content">
                    <div className="header-left">
                        <button className="back-button" onClick={() => routeTo('/new')}>
                            <span className="icon-box"><RiArrowGoBackFill /></span>
                            <span>Back</span>
                        </button>
                        <h1 className="project-title">VaultPay Mobile Wallet — UX/UI Design for a Beginner-Friendly and Secure Bitcoin Wallet</h1>
                    </div>
                    
                    <div className="header-right">
                        <p className="project-description">
                            With the rise of cryptocurrency, VaultPay set out to create a secure, user-friendly bitcoin wallet for everyday users. The project aimed to bridge the gap between tech-savvy crypto enthusiasts and first-time users.
                        </p>
                        
                        <div className="project-meta">
                            <div className="meta-item"> 
                                <span className="meta-label">Year</span>
                                <span className="meta-value">2024</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Client</span>
                                <span className="meta-value">Repsol</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Website</span>
                                <a className="meta-value link" href={images[searchParams.get('id') ?? ''].visit} target="_blank" rel="noopener noreferrer">
                                    <span>Visit live site </span>
                                    <BsBoxArrowUpRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-content-section">
                <div className="full-width-image">
                    <div className="image-wrapper small">
                        <Image 
                            src={images[searchParams.get('id') ?? ''].main[2]} 
                            alt="Project screenshot small" 
                            width={400} 
                            height={800}
                            className="project-img"
                        />
                    </div>
                    <div className="image-wrapper medium">
                        <Image 
                            src={images[searchParams.get('id') ?? ''].main[1]} 
                            alt="Project screenshot medium" 
                            width={800} 
                            height={1200}
                            className="project-img"
                        />
                    </div>
                    <div className="image-wrapper large">
                        <Image 
                            src={images[searchParams.get('id') ?? ''].main[0]} 
                            alt="Project screenshot large" 
                            width={1600} 
                            height={1200}
                            className="project-img"
                        />
                    </div>
                </div>

                <div className="text-section">
                    <h2 className="text-title">Problem</h2>
                    <p className="text-paragraph">
                        Cryptocurrency wallets are often complex and intimidating for new users. The challenge was to design a wallet that simplifies the experience without compromising security, making it accessible to everyone.
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
                        The result is a clean, intuitive wallet that guides users through every step. By removing technical jargon and focusing on clear actions, we increased user confidence and adoption rates significantly.
                    </p>
                </div>
            </section>

            <FooterSection />
        </main>
    )
}
