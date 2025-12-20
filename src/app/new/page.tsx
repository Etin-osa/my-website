"use client";

import React from "react";
import Image from "next/image";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import NavSection from "@/components/NavSection";

import '@/styles/new.scss';

export default function Homepage() {

    return (
        <main>
            <NavSection />

            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-main">
                        <h1 className="hero-title">
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
                        </h1>
                        
                        <button className="ios-button">
                            <span>Get in touch</span>
                            <IoArrowForwardCircleOutline size={20} />
                        </button>
                    </div>
                    
                    <div className="hero-footer">
                        <p className="hero-description">
                            We work closely with clients to design and develop digital experiences that not only look stunning but also deliver measurable results.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
