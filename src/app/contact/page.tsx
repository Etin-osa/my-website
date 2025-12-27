"use client";

import FooterSection from "@/components/FooterSection";
import NavSection from "@/components/NavSection";
import React from "react";

import '@/styles/contact.scss';
import { FaLinkedinIn } from "react-icons/fa";
import { MdContentCopy, MdCheck } from "react-icons/md";
import Image from "next/image";
import MotionView from "@/components/MotionView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { content, Language } from "@/data/content";

export default function Project() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [copied, setCopied] = useState(false);
    const [langKey, setLangKey] = useState<Language>('EN');

    const handleCopy = () => {
        navigator.clipboard.writeText("enogiomwanetinosafavour@gmail.com");
        setCopied(true);
    };

    return (
        <main key={langKey}>
            <NavSection setLangKey={setLangKey} langKey={langKey} />

            <section className="contact">
                <MotionView 
                    htmlTag="div" 
                    isDesktop={isDesktop}
                    htmlProps={{ className: "contact-title" }}
                    delay={0.2}
                >
                    {content[langKey].contact.title}
                </MotionView>

                <MotionView htmlTag="div" htmlProps={{ className: "contact-info" }} delay={0.3} isDesktop={isDesktop}>
                    <div className="email-container">
                        <a className="contact-email" href="mailto:enogiomwanetinosafavour@gmail.com">
                            enogiomwanetinosafavour@gmail.com
                        </a>
                        <button className="copy-button" onClick={handleCopy} aria-label="Copy email">
                            {copied ? <MdCheck className="copy-icon" /> : <MdContentCopy className="copy-icon" />}
                        </button>
                    </div>
                    <div className="contact-linkedin">
                        {content[langKey].contact.orMessage} <a href="https://www.linkedin.com/in/etin-osa02/" target="_blank"><FaLinkedinIn /></a>
                    </div>
                </MotionView>

                <MotionView htmlTag="div" htmlProps={{ className: "quote-container quote-contact" }} delay={0.4} isDesktop={isDesktop}>
                    <div className="quote-image">
                        <Image src="/images/noise.jpg" alt="Noise" fill />
                    </div>
                    <div className="quote-text">
                        {content[langKey].contact.quote}
                    </div>
                    <div className="quote-author">
                        <Image src="/images/speaker_blue.jpg" alt="Author" width={56} height={56} className="author-img" />
                        <div className="author-info">
                            <div className="author-name">Etinosa</div>
                            <span className="author-title">{content[langKey].contact.authorRole}</span>
                        </div>
                    </div>
                </MotionView>
            </section>

            <FooterSection langKey={langKey} />
        </main>
    )
}
