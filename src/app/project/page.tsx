"use client";

import FooterSection from "@/components/FooterSection";
import NavSection from "@/components/NavSection";
import { RiArrowGoBackFill } from "react-icons/ri";
import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

import '@/styles/project.scss';
import useViewTransition from "@/hooks/useViewTransition";

export default function page() {
    const { routeTo } = useViewTransition()

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
                                <span className="meta-value">Client Name</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Website</span>
                                <a className="meta-value link" href="">
                                    <span>Visit live site </span>
                                    <BsBoxArrowUpRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-content-section">
                <div className="full-width-image"></div>

                <div className="text-section">
                    <h2 className="text-title">Problem</h2>
                    <p className="text-paragraph">
                        Cryptocurrency wallets are often complex and intimidating for new users. The challenge was to design a wallet that simplifies the experience without compromising security, making it accessible to everyone.
                    </p>
                </div>

                <div className="image-grid-section">
                    <div className="image-grid">
                        {[1, 2, 3, 4].map((item) => (
                            <div className="grid-image-item" key={item}></div>
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
