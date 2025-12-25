"use client";

import FooterSection from "@/components/FooterSection";
import NavSection from "@/components/NavSection";
import React from "react";

import '@/styles/contact.scss';
import { FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Project() {
    return (
        <main>
            <NavSection />

            <section className="contact">
                <div className="contact-title">
                    If you would like to chat you can reach us at:
                </div>

                <div className="contact-info">
                    <a className="contact-email" href="mailto:enogiomwanetinosafavour@gmail.com">
                        enogiomwanetinosafavour@gmail.com
                    </a>
                    <div className="contact-linkedin">
                        or message via <a href="https://www.linkedin.com/in/etin-osa02/" target="_blank"><FaLinkedinIn /></a>
                    </div>
                </div>

                <div className="quote-container">
                    <div className="quote-text">
                        "Let’s collaborate! Whether it’s a new project, a partnership, or just a question, we’d love to hear from you. Reach out, and let’s create something amazing together. "
                    </div>
                    <div className="quote-author">
                        <Image src="/images/speaker_blue.jpg" alt="Author" width={56} height={56} className="author-img" />
                        <div className="author-info">
                            <div className="author-name">Steve Jobs</div>
                            <span className="author-title">Co-founder, Apple</span>
                        </div>
                    </div>
                </div>
            </section>

            <FooterSection />
        </main>
    )
}
